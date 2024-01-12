// import
const path = require('path');
const express = require('express');
const db = require('./util/database');

// setup
const app = express();
const port = 3000;

// static files
app.use(express.static(path.join(__dirname, '../', 'public')));

// read body
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));

class Rule {
    constructor(id, name, density, content) {
        this.id = id;
        this.name = name;
        this.density = density;
        this.content = content;
    }
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getFullName() {
        return this.id + '. ' + this.name;
    }

    getDensity() {
        return this.density;
    }

    getContent() {
        return this.content;
    }
}

class Metric {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
    getId() {
        return this.id;
    }

    getValue() {
        return this.value;
    }
}

async function main() {
    let data_imps = await db.run('improvements', {}).catch(console.dir);
    let ruleList = [];
    let ruleNameList = [];
    let densityList = [];
    let contentList = [];
    for (let i = 0; i < data_imps.length; i++) {
        let result = new Rule(data_imps[i]._id, data_imps[i].rule_name, data_imps[i].density, data_imps[i].content);
        ruleNameList.push(result.getFullName());
        densityList.push(result.getDensity());
        contentList.push(result.getContent());
        ruleList.push(result);
    }

    let data_metrics = await db.run('metrics', {}).catch(console.dir);
    // console.log(data_metrics);
    let metricList = [];
    let opNameList = [];
    for (let i = 0; i < data_metrics.length; i++) {
        let result = new Metric(data_metrics[i]._id, data_metrics[i].value);
        opNameList.push(result.getValue());
        metricList.push(result);
    }
    // console.log(opNameList);

    // routes
    app.locals.opt1 = 1; // max option, default = 1
    app.locals.opt2 = 1;

    app.locals.option_name = opNameList; // pass variable to view
    app.get('/', (req, res) => {
        res.render('home')
    })

    app.post('/get-answers', async (req, res) => {

        const rulename = [];
        const ruledensity = [];
        const rule_content = [];
        if (req.body.goodOption != 0 && req.body.badOption != 0) {
            const rowData = await db.runOne('matrix', { _id: req.body.goodOption }).catch(console.dir);
            const list = rowData.pros.find(item => item && item._id === req.body.badOption).data;
            const test_arr = list.split(',').map(Number);
            for (let index = 0; index < test_arr.length; index++) {
                let element = test_arr[index];
                if (element == 90) {
                    element = 41;
                } else if (element == 99) {
                    element = 42;
                }
                const data_des_name = ruleNameList[element - 1];
                const data_density = densityList[element - 1];
                const data_des_deitail = contentList[element - 1];
                rulename.push(data_des_name);
                if(data_density != 0) ruledensity.push("["+data_density+"]"); 
                rule_content.push(data_des_deitail);
            }
        } else {
            rulename.push('Vui lòng chọn tùy chọn');
        }

        app.locals.rule_name = rulename;
        app.locals.density = ruledensity;
        app.locals.content = rule_content;
        res.render('include/answers.ejs', { rulename, ruledensity, rule_content });
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })

}

main();

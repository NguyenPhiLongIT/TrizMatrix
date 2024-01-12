const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const metricController = require("./controllers/metric");
const improvementController = require("./controllers/improvement");
const matrixController = require("./controllers/matrix");
// const mongoConnect = require("./datas/database").mongoConnect;


const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.json());
const metricRouter = require("./routers/metric");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(metricRouter);


mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
    });

app.use(metricController.getAllMetrics, improvementController.getAllImprovements, matrixController.getAllMatrix, (req, res, next) => {
    next();
});

app.get("/", (req, res, next) => {
    res.render("home", { metrics: req.metrics });
    next();
});

app.post('/get-answers', async (req, res, next) => {

    let rulename = [], rulecontent = [];
    const rulename_list = req.improvements.map(item => item.rule_name);
    const rulecontent_list = req.improvements.map(item => item.content);

    if (req.body.goodOption != 0 && req.body.badOption != 0) {
        const list = req.matrix[req.body.goodOption].pros[req.body.badOption].data;
        const data_arr = list.split(',').map(Number);
        for (let index = 0; index < data_arr.length; index++) {
            let element = data_arr[index];
            if (element == 90) {
                element = 41;
            } else if (element == 99) {
                element = 42;
            }
            rulename.push(rulename_list[element - 1]);
            rulecontent.push(rulecontent_list[element - 1]);
        }
    } else {
        rulename.push('Vui lòng chọn thêm tùy chọn');
    }

    res.render('include/answers.ejs', { rulename, rulecontent });
});



app.listen(() => {
    console.log(`Example app listening on port ${PORT}`);
})

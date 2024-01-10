// import
const path = require('path');
const express = require('express');
const xlsx = require('node-xlsx');
// const connectDB = require('./database');

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

// xlsx
const datasheet = xlsx.parse(path.join(__dirname, 'resources', 'data', 'triz-matrix-table.xlsm'));

// xlsx get data
const data_des = datasheet[1].data;
const data_name = datasheet[2].data;
const data_matrix = datasheet[3].data;

// xlsx test get data from sheet4 (J48) and split to array (15 - 1 + 33 = 47)
const data_matrix_J48 = data_matrix[15 - 1 + 33][9];
const test_arr = data_matrix_J48.split(',');
// console.log(data_matrix_J48);
// console.log(test_arr);

// xlsx test use data and get data from sheet2 (description)
for (let index = 0; index < test_arr.length; index++) {
    const element = test_arr[index];
    const data_des_name = data_des[element - 1 + 2][1];
    const data_des_deitail = data_des[element - 1 + 2][5];
    // console.log(data_des_name + '\n' + data_des_deitail); 
}

// xlsx test use data and show to page
const data_option = [];
for (let index = 0; index < data_name.length; index++) {
    const element = data_name[index - 1 + 1][5];
    data_option.push(element);
}

// routes
app.locals.opt1 = 1; // max option, default = 1
app.locals.opt2 = 1;

app.locals.option_name = data_option; // pass variable to view
app.get('/', (req, res) => {
    res.render('home')
})

app.post('/get-answers', (req, res) => {
    const results = data_matrix[15 - 1 + parseInt(req.body.goodOption)][parseInt(req.body.badOption)];
    if(results == 90) rule_index = [90];
    else rule_index = [];
    const rule_name = [];
    const rule_appears = [];
    const rule_detail = [];

    try{
        const test_arr = results.split(',').map(Number);
        
        for (let index = 0; index < test_arr.length; index++) {
            const element = test_arr[index];
            const data_index = data_des[element - 1 + 2][0];
            const data_des_name = data_des[element - 1 + 2][1];
            const data_appears = data_des[element - 1 + 2][3];
            const data_des_deitail = data_des[element - 1 + 2][5];

            rule_index.push(data_index);
            rule_name.push(data_des_name);
            rule_appears.push(data_appears);
            rule_detail.push(data_des_deitail);
        }
        app.locals.rule_index = rule_index;
        app.locals.rule_name = rule_name;
        app.locals.rule_appears = rule_appears;
        app.locals.rule_detail = rule_detail;
        res.render('include/answers.ejs', { rule_index, rule_name, rule_appears, rule_detail });
        
    } catch(err){
        console.error(err.message);
        res.render('include/answers.ejs', { rule_index});
    }
});

// listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


// connectDB(client =>{
//     console.log(client);
//     app.listen(3000);
// });


// const mongoose = require('mongoose')
// const URL = 'mongodb+srv://Long:Long10092003@cluster0.d11y1nf.mongodb.net/?retryWrites=true&w=majority'

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       URL,
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     console.log('Connected to mongoDB')
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

// connectDB()

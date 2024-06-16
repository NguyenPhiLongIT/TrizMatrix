const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const metricController = require("./controllers/metric");
const improvementController = require("./controllers/improvement");
const matrixController = require("./controllers/matrix");
const data = require("./controllers/data")
// const mongoConnect = require("./datas/database").mongoConnect;


const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.json());
const metricRouter = require("./routers/metric");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(metricRouter);

mongoose
    .connect('mongodb+srv://userTest:nopassword@cluster0.nnzxn5t.mongodb.net/triz_matrix')
    .then(() => {
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
    });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get("/", (req, res, next) => {
    res.send("hi");
    next();
});

app.get("/get-improvements", improvementController.getAllImprovements)

app.get("/get-improvement/:id", improvementController.getImprovementByID)

app.get("/get-metrics", metricController.getAllMetrics)

app.get("/get-metric/:id", metricController.getMetricById);

app.get("/get-matrix", matrixController.getAllMatrix)

app.post('/get-matrix-data', data.getDataList);

app.post('/get-answers', async (req, res, next) => {

    let ruleid = [], rulename = [], rulecontent = [], ruledensity = [];
    const ruleid_list = req.improvements.map(item => item._id);
    const rulename_list = req.improvements.map(item => item.rule_name);
    const rulecontent_list = req.improvements.map(item => item.content);
    const ruledensity_list = req.improvements.map(item => item.density);

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
            if (ruleid_list[element - 1] != 90 && ruleid_list[element - 1] != 99) ruleid.push(ruleid_list[element - 1] + ". ");
            rulename.push(rulename_list[element - 1]);
            rulecontent.push(rulecontent_list[element - 1]);
            if (ruledensity_list[element - 1] != 0) ruledensity.push("[" + ruledensity_list[element - 1] + "]");
        }
    } else {
        rulename.push('Vui lòng chọn thêm tùy chọn');
    }

    res.render('include/answers.ejs', { ruleid, rulename, rulecontent, ruledensity });
});



app.listen(() => {
    console.log(`Example app listening on port ${PORT}`);
})

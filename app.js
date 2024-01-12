const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const metricController = require("./controllers/metric");
const mongoConnect = require("./datas/database").mongoConnect;

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "views");

const metricRouter = require("./routers/metric");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.use(metricRouter);

// app.post("/get-answers", async (req, res) => {
//   const rulename = [];
//   const ruledensity = [];
//   const rule_content = [];
//   if (req.body.goodOption != 0 && req.body.badOption != 0) {
//     const rowData = await db
//       .runOne("matrix", { _id: req.body.goodOption })
//       .catch(console.dir);
//     const list = rowData.pros.find(
//       (item) => item && item._id === req.body.badOption
//     ).data;
//     const test_arr = list.split(",").map(Number);
//     for (let index = 0; index < test_arr.length; index++) {
//       let element = test_arr[index];
//       if (element == 90) {
//         element = 41;
//       } else if (element == 99) {
//         element = 42;
//       }
//       const data_des_name = ruleNameList[element - 1];
//       const data_density = densityList[element - 1];
//       const data_des_deitail = contentList[element - 1];
//       rulename.push(data_des_name);
//       if (data_density != 0) ruledensity.push("[" + data_density + "]");
//       rule_content.push(data_des_deitail);
//     }
//   } else {
//     rulename.push("Vui lòng chọn tùy chọn");
//   }

//   app.locals.rule_name = rulename;
//   app.locals.density = ruledensity;
//   app.locals.content = rule_content;
//   res.render("include/answers.ejs", { rulename, ruledensity, rule_content });
// });

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

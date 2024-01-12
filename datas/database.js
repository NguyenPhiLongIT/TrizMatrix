const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  const uri = process.env.DB_URI;
  console.log(uri);
  MongoClient.connect(
    "mongodb+srv://NTN:6hqBkyteqTJWBAvK@cluster0.wnn4tkv.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connect to database successfully!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("Error connecting to database!");
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found!";
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;

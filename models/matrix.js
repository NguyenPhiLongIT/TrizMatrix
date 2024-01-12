const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matrixSchema = new Schema({
  ID: String,
  pros: [
    {
      ID: String,
      data: String,
    },
  ],
});

module.exports = mongoose.model("Metrics", matrixSchema);

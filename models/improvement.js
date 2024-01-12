const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const improvementSchema = new Schema({
  ID: { type: String },
  title: { type: String },
  content: [{ type: String }],
  density: { type: Number },
});

module.exports = mongoose.model("Improvements", improvementSchema);

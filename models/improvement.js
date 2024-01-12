const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const improvementSchema = new Schema({
    _id: { type: String },
    rule_name: { type: String },
    density: { type: Number },
    content: [{ type: String }],
});

module.exports = mongoose.model("Improvements", improvementSchema, "improvements");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metricSchema = new Schema({
    _id: { type: String },
    value: { type: String },
    action: { type: String },
    object: { type: String },
});

module.exports = mongoose.model("Metrics", metricSchema, "metrics");

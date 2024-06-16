const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matrixSchema = new Schema({
    pros: [
        {
            data: String,
            _id: Number,
        },
    ],
    _id: Number
});

module.exports = mongoose.model("Matrix", matrixSchema, "matrix");

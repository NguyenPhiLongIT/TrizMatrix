const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matrixSchema = new Schema({
    pros: [
        {
            data: String,
            _id: String,
        },
    ],
    _id: String
});

module.exports = mongoose.model("Matrix", matrixSchema, "matrix");

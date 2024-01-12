const MatrixModel = require("../models/matrix");

exports.getAllMatrix = async () => {
    return await MatrixModel.find();
};

exports.createMatrix = async (metric) => {
    return await MatrixModel.create(metric);
};

exports.getMatrixByID = async (id) => {
    return await MatrixModel.findById(id);
};

exports.updateMatrix = async (id, metric) => {
    return await MatrixModel.update(id, metric);
};

exports.deleteMatrix = async (id) => {
    return await MatrixModel.delete(id);
};

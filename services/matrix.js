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

exports.getMatrixData = async (col, row) => {
    return await MatrixModel.findOne(
        { _id: col, 'pros._id': row },
        { 'pros.$': 1, _id: 1 } // This projection includes the specific element from the array and the document's _id
    ).exec().then((data) => {
        if (!data) return null;
        var data = data.pros[0].data;
        var dataArray = data.split(",").map(Number);
        return dataArray
    })
};

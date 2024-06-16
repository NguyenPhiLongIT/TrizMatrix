const MatrixService = require("../services/matrix");

exports.getAllMatrix = async (req, res, next) => {
    try {
        let matrix = await MatrixService.getAllMatrix();
        res.json(matrix)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMatrix = async (req, res) => {
    try {
        const matrix = await MatrixService.createMatrix(req.body);
        res.json({ data: matrix, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMatrixByID = async (req, res) => {
    try {
        const matrix = await MatrixService.getMatrixByID(req.params.id);
        res.json({ data: matrix, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMatrix = async (req, res) => {
    try {
        const matrix = await MatrixService.updateMatrix(req.params.id, req.body);
        res.json({ data: matrix, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMatrix = async (req, res) => {
    try {
        const matrix = await MatrixService.deleteMatrix(req.params.id);
        res.json({ data: matrix, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMatrixData = async (req, res) => {
    try {
        const data = await MatrixService.getMatrixData(req.body.col, req.body.row);
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json({ data: data, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

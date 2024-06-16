const improvement = require("./improvement")
const metric = require("../services/metric");
const MatrixService = require("../services/matrix");

exports.getChooseList = improvement.getAllImprovements;
exports.getDataList = async (req, res) => {
    try {
        const data = await MatrixService.getMatrixData(req.body.col, req.body.row);
        if (!data) {
            return res.status(201).json([{ _id: 0, value: "Không có quy tắc!" }]);
        }
        // Initialize an array to hold the results
        var result = [];

        // Loop through the data array
        for (var item of data) {
            // Push the result of getMetricById into the result array
            result.push(await metric.getMetricByID(item));
        }
        if (!result[0]) result = ([{ _id: 90, value: "Không có quy tắc!" }]);
        res.json({ data: result, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

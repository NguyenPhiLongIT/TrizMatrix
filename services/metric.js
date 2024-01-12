const MetricModel = require("../models/metric");

exports.getAllMetrics = async () => {
    return await MetricModel.find();
};

exports.createMetric = async (metric) => {
    return await MetricModel.create(metric);
};

exports.getMetricByID = async (id) => {
    return await MetricModel.findById(id);
};

exports.updateMetric = async (id, metric) => {
    return await MetricModel.update(id, metric);
};

exports.deleteMetric = async (id) => {
    return await MetricModel.delete(id);
};

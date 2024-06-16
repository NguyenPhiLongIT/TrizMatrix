const metricService = require("../services/metric");

exports.getAllMetrics = async (req, res, next) => {
    try {
        const metrics = await metricService.getAllMetrics();
        metrics.sort((a, b) => parseInt(a._id) - parseInt(b._id));
        res.json(metrics)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.createMetric = async (req, res, next) => {
    try {
        const metric = await metricService.createMetric(req.body);
        res.json({ data: metric, status: "success" }); // use res.json to send an object
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getMetricById = async (req, res, next) => {
    try {
        const metric = await metricService.getMetricByID(req.params.id);
        res.json({ data: metric, status: "success" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.updateMetric = async (req, res, next) => {
    try {
        const metric = await metricService.updateMetric(req.params.id, req.body);
        res.render({ data: metric, status: "success" });
    } catch (err) {
        res.status(500).render({ error: err.message });
    }
};

exports.deleteMetric = async (req, res, next) => {
    try {
        const metric = await metricService.deleteMetric(req.params.id);
        res.render({ data: metric, status: "success" });
    } catch (err) {
        res.status(500).render({ error: err.message });
    }
};

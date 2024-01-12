const metricService = require("../services/metric");

exports.getAllMetrics = async (req, res, next) => {
  try {
    const metrics = await metricService.getAllMetrics();
    res.render("/", metrics);
    res.json({ data: metrics, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMetric = async (req, res, next) => {
  try {
    const metric = await metricService.createMetric(req.body);
    res.json({ data: metric, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMetricById = async (req, res, next) => {
  try {
    const metric = await metricService.getMetricById(req.params.id);
    res.render("/", {});
    res.json({ data: metric, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMetric = async (req, res, next) => {
  try {
    const metric = await metricService.updateMetric(req.params.id, req.body);
    res.json({ data: metric, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMetric = async (req, res, next) => {
  try {
    const metric = await metricService.deleteMetric(req.params.id);
    res.json({ data: metric, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

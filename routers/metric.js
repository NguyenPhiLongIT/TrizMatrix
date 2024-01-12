const path = require("path");
const express = require("express");

const metricController = require("../controllers/metric");

const router = express.Router();

router.get('/a', metricController.getAllMetrics);

module.exports = router;

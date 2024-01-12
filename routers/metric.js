const path = require("path");
const express = require("express");

const metricController = require("../controllers/metric");

const router = express.Router();

router.get("/", metricController.getMetricById);

module.exports = router;

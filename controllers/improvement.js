const improvementService = require("../services/improvement");

exports.getAllImprovements = async (req, res, next) => {
	try {
		const improvements = await improvementService.getAllImprovements();
		res.json(improvements);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.createImprovement = async (req, res) => {
	try {
		const improvement = await improvementService.createImprovement(req.body);
		res.json({ data: improvement, status: "success" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getImprovementByID = async (req, res) => {
	try {
		const improvement = await improvementService.getImprovementByID(
			req.params.id
		);
		res.json({ data: improvement, status: "success" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updateImprovement = async (req, res) => {
	try {
		const improvement = await improvementService.updateImprovement(
			req.params.id,
			req.body
		);
		res.json({ data: improvement, status: "success" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.deleteImprovement = async (req, res) => {
	try {
		const improvement = await improvementService.deleteImprovement(
			req.params.id
		);
		res.json({ data: improvement, status: "success" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

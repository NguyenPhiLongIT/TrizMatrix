const ImprovementModel = require("../models/improvement");

exports.getAllImprovements = async () => {
  return await ImprovementModel.find();
};

exports.createImprovement = async (improvement) => {
  return await ImprovementModel.create(improvement);
};

exports.getImprovementByID = async (id) => {
  return await ImprovementModel.findById(id);
};

exports.updateImprovement = async (id, improvement) => {
  return await ImprovementModel.update(id, improvement);
};

exports.deleteImprovement = async (id) => {
  return await ImprovementModel.delete(id);
};

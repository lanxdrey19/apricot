const mongoose = require("mongoose");
const templateTemplate = require("./template_template");

const TemplateSchema = mongoose.Schema(templateTemplate.templateTemplate);

module.exports = mongoose.model("Templates", TemplateSchema);

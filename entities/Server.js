const mongoose = require("mongoose");
const serverTemplate = require("./server_template");

const ServerSchema = mongoose.Schema(serverTemplate.serverTemplate);

module.exports = mongoose.model("Servers", ServerSchema);

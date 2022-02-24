const mongoose = require("mongoose");
const userTemplate = require("./user_template");

const UserSchema = mongoose.Schema(userTemplate.userTemplate);

module.exports = mongoose.model("Users", UserSchema);

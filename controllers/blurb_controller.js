const User = require("../entities/User");
const blurbDAO = require("../daos/blurb_dao");
const userDAO = require("../daos/user_dao");

const updateBlurb = async function (userId, description) {
  const result = await userDAO.findUser(userId);
  if (result) {
    console.log("hey controoler");
    blurbDAO.setBlurb(userId, description);
    console.log("hey controoler pt 2");
  } else {
    throw new Error("A record has already been created");
  }
};

module.exports = {
  updateBlurb,
};

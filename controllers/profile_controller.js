const profileDAO = require("../daos/profile_dao");

const getUserProfile = async function (requestBody) {
  return await profileDAO.findUserProfile(requestBody);
};

module.exports = {
  getUserProfile,
};

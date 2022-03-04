const userDAO = require("../daos/user_dao");

const createUser = async function (requestBody) {
  return await userDAO.postUser(requestBody);
};

module.exports = {
  createUser,
};

const executeCreateUser = async function (userController, userId) {
  return await userController.createUser(userId);
};

const executeGetUser = async function (userController, userId) {
  return await userController.getUser(userId);
};

module.exports = {
  executeCreateUser,
  executeGetUser,
};

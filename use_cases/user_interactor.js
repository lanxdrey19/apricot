const executeCreateUser = async function (userController, requestBody) {
  return await userController.createUser(requestBody);
};

module.exports = {
  executeCreateUser,
};

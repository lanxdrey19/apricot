const executeGetUserProfile = async function (profileController, requestBody) {
  return await profileController.getUserProfile(requestBody);
};

module.exports = {
  executeGetUserProfile,
};

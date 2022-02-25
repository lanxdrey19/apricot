const executeGetUserTags = async function (tagController, userId) {
  return await tagController.getTags(userId);
};

const executeAddTag = async function (tagController, requestBody) {
  return await tagController.addTag(requestBody);
};

const executeDeleteTag = async function (tagController, requestBody) {
  return await tagController.deleteTag(requestBody);
};

const executeUpdateUserTag = async function (tagController, requestBody) {
  return await tagController.updateUserTag(requestBody);
};

const executeTagUserCard = async function (tagController, requestBody) {
  return await tagController.tagUserCard(requestBody);
};

module.exports = {
  executeGetUserTags,
  executeAddTag,
  executeDeleteTag,
  executeUpdateUserTag,
  executeTagUserCard,
};

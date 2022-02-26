const executeCreateTemplate = async function (templateController, requestBody) {
  return await templateController.createTemplate(requestBody);
};

const executeIncrementSerial = async function (
  templateController,
  requestBody
) {
  return await templateController.updateSerial(requestBody);
};

module.exports = {
  executeCreateTemplate,
  executeIncrementSerial,
};

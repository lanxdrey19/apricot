const executeUpdateBlurb = async function (blurbController, requestBody) {
  await blurbController.updateBlurb(requestBody);
};

module.exports = {
  executeUpdateBlurb,
};

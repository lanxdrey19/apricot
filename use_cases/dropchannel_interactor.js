const executeUpdateDropChannel = async function (
  dropChannelController,
  requestBody
) {
  return await dropChannelController.updateDropChannel(requestBody);
};

module.exports = {
  executeUpdateDropChannel,
};

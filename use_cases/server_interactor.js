const executeGetServer = async function (serverController, requestBody) {
  return await serverController.getServer(requestBody);
};

const executeCreateServer = async function (serverController, requestBody) {
  await serverController.createServer(requestBody);
};

const executeUpdateDropChannel = async function (
  serverController,
  serverId,
  requestBody
) {
  return await serverController.updateDropChannel(serverId, requestBody);
};

module.exports = {
  executeGetServer,
  executeCreateServer,
  executeUpdateDropChannel,
};

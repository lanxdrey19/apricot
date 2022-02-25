const executeGetServer = async function (serverController, serverId) {
  return await serverController.getServer(serverId);
};

const executeCreateServer = async function (serverController, requestBody) {
  return await serverController.createServer(requestBody);
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

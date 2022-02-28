const executeGetServer = async function (serverController, requestBody) {
  return await serverController.getServer(requestBody);
};

const executeCreateServer = async function (serverController, requestBody) {
  await serverController.createServer(requestBody);
};

module.exports = {
  executeGetServer,
  executeCreateServer,
};

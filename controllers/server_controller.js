const Server = require("../entities/Server");
const serverDAO = require("../daos/server_dao");

const getServer = async function (serverId) {
  return await serverDAO.findServer(serverId);
};
const createServer = async function (requestBody) {
  duplicateServerRecord = await serverDAO.findServer(requestBody.serverId);

  if (!requestBody.isAllowed) {
    throw new Error("the server record could not be created");
  } else if (duplicateServerRecord.length !== 0) {
    throw new Error("A record has already been created");
  } else {
    const server = new Server({
      serverId: requestBody.serverId,
    });
    return await serverDAO.postServer(server);
  }
};
const updateDropChannel = async function (serverId, requestBody) {
  if (!requestBody.isAllowed) {
    throw new Error("the server's drop channel cannot be updated");
  }
  return await serverDAO.putServerDropChannel(
    serverId,
    requestBody.newDropChannel
  );
};

module.exports = {
  getServer,
  createServer,
  updateDropChannel,
};

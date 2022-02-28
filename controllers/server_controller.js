const Server = require("../entities/Server");
const serverDAO = require("../daos/server_dao");

const getServer = async function (requestBody) {
  return await serverDAO.findServer(requestBody);
};
const createServer = async function (requestBody) {
  const duplicateServerRecord = await serverDAO.findServer(requestBody);
  if (duplicateServerRecord) {
    throw new Error(
      "The server has already been set up. Set up the drop channel using /dropchannel set"
    );
  } else {
    await serverDAO.postServer(requestBody);
  }
};

module.exports = {
  getServer,
  createServer,
};

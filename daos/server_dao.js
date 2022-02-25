const Server = require("../entities/Server");

const findServer = async function (serverIdentifier) {
  try {
    const server = await Server.findOne({
      serverId: serverIdentifier,
    });
    return server;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const postServer = async function (server) {
  try {
    const savedServer = await server.save();
    return savedServer;
  } catch (err) {
    throw new Error("the server record could not be created");
  }
};

const putServerDropChannel = async function (serverIdentifier, newDropChannel) {
  try {
    const updatedServer = await Server.updateOne(
      { serverId: serverIdentifier },
      { $set: { dropChannel: newDropChannel } }
    );
    return updatedServer;
  } catch (err) {
    throw new Error("the server's drop channel could not be updated");
  }
};

module.exports = {
  findServer,
  postServer,
  putServerDropChannel,
};

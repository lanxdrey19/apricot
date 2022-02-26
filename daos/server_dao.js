const Server = require("../entities/Server");

const findServer = async function (requestBody) {
  try {
    const server = await Server.findOne({
      serverId: requestBody.serverId,
    });
    return server;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const postServer = async function (requestBody) {
  try {
    const server = new Server({
      serverId: requestBody.serverId,
    });
    await server.save();
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

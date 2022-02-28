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

module.exports = {
  findServer,
  postServer,
};

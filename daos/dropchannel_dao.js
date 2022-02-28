const Server = require("../entities/Server");

const putServerDropChannel = async function (requestBody) {
  try {
    await Server.updateOne(
      { serverId: requestBody.serverId },
      { $set: { dropChannel: requestBody.newDropChannel } }
    );
  } catch (error) {
    throw new Error("the server's drop channel could not be updated");
  }
};

module.exports = {
  putServerDropChannel,
};

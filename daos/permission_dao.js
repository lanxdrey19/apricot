const User = require("../entities/User");
const Server = require("../entities/Server");

const checkPermissions = async function (
  serverId,
  userId,
  adminRights,
  permissions
) {
  try {
    let finalObject = {
      message: "",
      validity: true,
      dropChannel: "",
    };
    let server;

    if (permissions[3]) {
      if (!adminRights) {
        finalObject.validity = false;
        finalObject.message =
          "Error, the user does not have admin rights to execute this command";
      }
    }

    if (permissions[2]) {
      const user = await User.findOne({
        userId: userId,
      });
      if (!user) {
        finalObject.validity = false;
        finalObject.message =
          "Error, the user with this user is not registered, you must register using /user start";
      }
    }

    if (permissions[0]) {
      server = await Server.findOne({
        serverId: serverId,
      });
      if (!server) {
        finalObject.validity = false;
        finalObject.message =
          "Error, you must set up your server using /server setup";
      } else if (permissions[1]) {
        if (!server.dropChannel) {
          finalObject.validity = false;
          finalObject.message =
            "Error, you must set up your drop channel using /dropchannel set";
        } else {
          finalObject.dropChannel = server.dropChannel;
        }
      }
    }
    return finalObject;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  checkPermissions,
};

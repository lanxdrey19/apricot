const User = require("../entities/User");
const Server = require("../entities/Server");

const checkPermissions = async function (
  serverId,
  userId,
  adminRights,
  permissions
) {
  try {
    let server;

    if (permissions[3]) {
      if (!adminRights) {
        throw new Error(
          "The user does not have admin rights to execute this command"
        );
      }
    }

    if (permissions[2]) {
      const user = await User.findOne({
        userId: userId,
      });
      if (!user) {
        throw new Error(
          "Error, the user specified is not registered, you must register using /user start"
        );
      }
    }
    if (permissions[0]) {
      server = await Server.findOne({
        serverId: serverId,
      });

      if (!server) {
        throw new Error(
          "Error, you must set up your server using /server setup"
        );
      } else if (permissions[1]) {
        if (!server.dropChannel) {
          throw new Error(
            "Error, you must set up your drop channel using /dropchannel set"
          );
        }
      }
    }
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  checkPermissions,
};

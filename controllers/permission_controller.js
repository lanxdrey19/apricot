const User = require("../entities/User");
const permissionDAO = require("../daos/permission_dao");

const checkPermissions = async function (
  serverId,
  userId,
  adminRights,
  permissions
) {
  return await permissionDAO.checkPermissions(
    serverId,
    userId,
    adminRights,
    permissions
  );
};

module.exports = {
  checkPermissions,
};

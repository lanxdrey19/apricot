const executeCheckPermissions = async function (
  permissionController,
  serverId,
  userId,
  adminRights,
  permissions
) {
  return await permissionController.checkPermissions(
    serverId,
    userId,
    adminRights,
    permissions
  );
};

module.exports = {
  executeCheckPermissions,
};

const executeCheckPermissions = async function (
  permissionController,
  serverId,
  userId,
  adminRights,
  permissions
) {
  await permissionController.checkPermissions(
    serverId,
    userId,
    adminRights,
    permissions
  );
};

module.exports = {
  executeCheckPermissions,
};

const serverTemplate = {
  serverId: {
    type: String,
    required: true,
  },
  dropChannel: {
    type: String,
    default: null,
  },
};

module.exports = {
  serverTemplate,
};

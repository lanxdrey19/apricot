const executeUpdateBlurb = async function (
  blurbController,
  userId,
  description
) {
  await blurbController.updateBlurb(userId, description);
};

module.exports = {
  executeUpdateBlurb,
};

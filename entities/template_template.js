const templateTemplate = {
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  era: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  serial: {
    type: Number,
    default: 1,
  },
};

module.exports = {
  templateTemplate,
};

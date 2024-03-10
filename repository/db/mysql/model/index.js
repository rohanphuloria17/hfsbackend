const applicant = require("./applicant");
const initialise = require("./initialise");

module.exports = {
  initialise,
  getModel: () => ({
    applicant: applicant.get(),
  }),
};

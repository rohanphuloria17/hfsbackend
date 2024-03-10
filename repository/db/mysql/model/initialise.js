const submitForm = require("./applicant");

const initialise = async () => {
  await submitForm.initialise();
};

module.exports = initialise;

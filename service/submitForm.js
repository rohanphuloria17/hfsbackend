/* eslint-disable no-useless-catch */
const { getModel } = require("../repository/db/mysql/model/index");

const { applicant } = getModel();

module.exports = async (params) => {
  try {
    const {
      firstName,
      LastName,
      email,
      phone,
      projectDetails,
      skills,
      totalWorkExperience,
    } = params;
    await applicant.create({
      first_name: firstName,
      last_name: LastName,
      email,
      phone,
      skills,
      total_work_experience: totalWorkExperience,
      project_details: projectDetails,
    });
  } catch (err) {
    throw err;
  }
};

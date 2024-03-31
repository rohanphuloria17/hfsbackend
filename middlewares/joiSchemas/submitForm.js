const Joi = require("joi");

const submitFormBodyValidation = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    LastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    projectDetails: Joi.string().required(),
    skills: Joi.string().required(),
    totalWorkExperience: Joi.number().required(),
  })
  .unknown(true);

const submitForm = async (req, res, next) => {
  try {
    await submitFormBodyValidation.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = submitForm;

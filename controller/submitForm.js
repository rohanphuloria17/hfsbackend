const { submitForm } = require("../service/index");

module.exports = async (req, res, next) => {
  const { body: params } = req;
  try {
    await submitForm(params);
    req.returnResponse = {
      success: true,
    };
    next();
  } catch (err) {
    next(err);
  }
};

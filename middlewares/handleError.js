const { constant } = require("../utility");

module.exports = async (err, req, res, next) => {
  try {
    if (!req.returnResponse) req.returnResponse = {};
    Object.keys(err).forEach((key) => {
      req.returnResponse[key] = err[key];
    });
    if (!req.returnResponse.status) req.returnResponse.status = 500;
    res.json(req.returnResponse);
  } catch (error) {
    const [INTERNAL_SERVER_ERROR] = Object.keys(
      constant.ERROR.INTERNAL_SERVER_ERROR
    );
    req.toReturn = INTERNAL_SERVER_ERROR;
    res.json(req.toReturn);
  }
};

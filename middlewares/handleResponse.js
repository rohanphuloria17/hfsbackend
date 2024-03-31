module.exports = async (req, res, next) => {
  try {
    res.json(req.returnResponse);
  } catch (err) {
    next(err);
  }
};

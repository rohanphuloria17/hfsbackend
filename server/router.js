const express = require("express");

module.exports = function (app) {
  const router = express.Router();
  app.use("/", router);
  app.all("*", (req, res) =>
    res.status(404).json({ status: "error", message: "not implemented" })
  );
  return router;
};

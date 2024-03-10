const express = require("express");
const ct = require("connect-timeout");
const router = require("./router");
const routes = require("../routes/submitForm");

module.exports = async function (port) {
  const app = express();
  app.use(ct("65s"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.listen(port, () => {
    console.log("Server started");
    routes(router(app));
  });
};

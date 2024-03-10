/* eslint-disable no-console */
const express = require("express");
require("dotenv").config();
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const cors = require("cors");
const { initService } = require("./initialise");
/**
 * @returns {object} express app
 */
const initializeServer = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: "60mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
  return app;
};

const appInitialise = async () => {
  const app = initializeServer();
  const port = process.env.PORT || 8080;
  await initService(app);
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
  return app;
};

appInitialise();

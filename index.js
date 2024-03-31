/* eslint-disable no-console */
const express = require("express");
require("dotenv").config();
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const cors = require("cors");
const { initService } = require("./initialise");
const router = require("./routes/router");
const routes = require("./routes/index");

/**
 * @returns {object} express app
 */
const initializeServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: "60mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));
  return app;
};

const appInitialise = async () => {
  const app = await initializeServer();
  const port = process.env.PORT || 8080;
  await initService(app);
  await app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    routes(router(app));
  });
  return app;
};

appInitialise();

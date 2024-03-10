const { db } = require("./repository/index");
const routes = require("./routes");

const initService = async (app) => {
  await db.mysql.migrations.init();
  await db.mysql.connection.createConnection.init();
  await db.mysql.model.initialise();
  routes(app);
};

module.exports = {
  initService,
};

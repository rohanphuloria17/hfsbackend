const { Sequelize } = require("sequelize");

let connection;

module.exports = {
  async init() {
    const config = process.env;
    connection = await new Sequelize({
      host: config.MYSQL_HOST,
      username: config.MYSQL_USER,
      password: config.MYSQL_PASS,
      database: config.MYSQL_DB_REACT,
      dialect: "mysql",
    });
  },
  get: async () => connection,
};

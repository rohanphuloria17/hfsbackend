/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-catch */

const { Sequelize } = require("sequelize");
const migrations = require("./migrations");

const Migrations = {
  async init() {
    try {
      const config = process.env;
      const tempConn = new Sequelize({
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        username: config.MYSQL_USER,
        password: config.MYSQL_PASS,
        // database: config.MYSQL_DB_REACT,
        dialect: "mysql",
      });
      await checkDB(tempConn, config);
      await migrations.run(tempConn);
    } catch (ex) {
      throw ex;
    }
  },
};

const checkDB = async (conn, config) => {
  await conn.query(`create database if not exists ${config.MYSQL_DB_REACT}`);
};

module.exports = Migrations;

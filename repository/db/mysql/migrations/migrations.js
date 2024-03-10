/* eslint-disable no-use-before-define */
const fs = require("fs");
const path = require("path");

const subDir = "up";
const migrationFolder = path.join(__dirname, subDir);

module.exports.run = async function (conn) {
  console.log("inside migration run");
  await checkMigrationTable(conn);
  const migrations = [];
  for await (const file of fs.readdirSync(migrationFolder)) {
    file.endsWith(".sql") ? migrations.push({ file }) : false;
  }
  migrations.sort((a, b) => a.file.split("__")[0] * 1 - b.file.split("__")[0]);
  const dbAppliedMigration = (await getMaxMigration(conn)) || 0;
  await runMigrations(conn, migrations, dbAppliedMigration);
};

const checkMigrationTable = async function (conn) {
  await conn.query(
    `create table if not exists ${process.env.MYSQL_DB_REACT}.f_migrations (id int auto_increment primary key, num int, fileName char(255), created datetime )`
  );
};

const getMaxMigration = async function (conn) {
  return (
    await conn.query(
      `select ifnull(max(num),0) as num from ${process.env.MYSQL_DB_REACT}.f_migrations`
    )
  )[0].num;
};

const runMigrations = async function (conn, migrations, lastMigration) {
  const migrationsToBeApplied = [];
  for (const migration of migrations) {
    if (migration.file.split("__")[0] * 1 > lastMigration) {
      const sql = fs.readFileSync(
        path.join(migrationFolder, migration.file),
        "utf-8"
      );
      migrationsToBeApplied.push({
        id: migration.file.split("__")[0] * 1,
        sql,
        name: migration.file,
      });
    }
  }
  if (migrationsToBeApplied.length > 0) {
    console.log("applying new migrations");
  }
  for (const newMigration of migrationsToBeApplied) {
    try {
      await conn.query("START TRANSACTION");
      try {
        const queries = newMigration.sql.split(";");
        for await (const query of queries) {
          if (query.trim()) {
            await conn.query(query);
          }
        }
        await conn.query(
          `insert into ${process.env.MYSQL_DB_REACT}.f_migrations values (null, ${newMigration.id}, '${newMigration.name}', now())`
        );
      } catch (ex) {
        await conn.query("ROLLBACK");
        throw ex;
      }
      await conn.query("COMMIT");
      console.log(`applied migration ${newMigration.id}: ${newMigration.name}`);
    } catch (ex) {
      console.error("failed to apply migration", ex);
      throw ex;
    }
  }
};

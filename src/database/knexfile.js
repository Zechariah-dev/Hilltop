const config = require("../config");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      database: "hilltop",
      user: "root",
      password: "password",
    },
    searchPath: ["knex", "public"],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

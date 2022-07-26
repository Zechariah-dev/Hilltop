const path = require("path")
const config = require("../config")

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
    test: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            port: 3306,
            database: "hilltop_test",
            user: "root",
            password: "password",
        },
        searchPath: ["knex", "public"],
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(__dirname, "migrations"),
            tableName: "knex_migrations",
        },
        seeds: {
            directory: path.resolve(__dirname, "seeds"),
        },
    },
    production: {
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
            directory: path.resolve(__dirname, "migrations"),
            tableName: "knex_migrations",
        },
        seeds: {
            directory: path.resolve(__dirname, "seeds"),
        },
    },
    raw: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "password",
        },
        searchPath: ["knex", "public"],
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(__dirname, "migrations"),
            tableName: "knex_migrations",
        },
        seeds: {
            directory: path.resolve(__dirname, "seeds"),
        },
    },
}

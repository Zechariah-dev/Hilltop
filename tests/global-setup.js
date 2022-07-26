const Knex = require("knex")
const Knexfile = require("../src/database/knexfile")

const database = "hilltop_test"

// Create the database
async function createTestDatabase() {
    const knex = Knex(Knexfile["raw"])

    try {
        await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
        await knex.raw(`CREATE DATABASE ${database}`)
    } catch (err) {
        throw new Error(error)
    } finally {
        await knex.destroy()
    }
}

// Seed the database with schema and data
async function seedTestDatabase() {
    const knex = Knex(Knexfile["test"])

    try {
        await knex.migrate.latest()
        await knex.seed.run()
        console.log("Test database created successfully")
    } catch (error) {
        throw new Error(error)
    } finally {
        await knex.destroy()
    }
}

module.exports = async () => {
    try {
        console.log("here")
        await createTestDatabase()
        await seedTestDatabase()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

const Knex = require("knex")
const Knexfile = require("../src/database/knexfile")

const database = "hilltop_test"

module.exports = async () => {
    const knex = Knex(Knexfile["test"])

    try {
        await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

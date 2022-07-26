const { Model } = require("objection")
const knex = require("knex")
const knexfile = require("./knexfile")
const config = require("../config")

const db = knex(knexfile[config.env])

Model.knex(db)

module.exports = db

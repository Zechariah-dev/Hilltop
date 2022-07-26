/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments("id")
        table.string("email").unique().notNullable()
        table.string("password").notNullable()
        table.string("salt").notNullable()
        table.string("first_name")
        table.string("last_name")
        table.string("contact")
        table.date("hire_date")
        table.enu("gender", ["male", "female"])
        table.enu("role", ["user", "waiter", "chef", "driver", "manager"])
        table.integer("restuarant").nullable()
        table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6))

        table.primary(["id"])
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users")
}

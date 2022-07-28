/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("restuarants", function (table) {
        table.increments("id")
        table.string("name").notNullable()
        table.integer("ownerId")
        table.datetime("createdAt", { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime("updatedAt", { precision: 6 }).defaultTo(knex.fn.now(6))
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("restuarants")
}

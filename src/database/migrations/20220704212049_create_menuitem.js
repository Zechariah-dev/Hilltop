/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("menuitems", function (table) {
        table.increments("id")
        table.string("name").notNullable()
        table.float("price").notNullable()
        table.string("currency").defaultTo("NGN")
        table.string("category")
        table.string("description")
        table.json("rating")
        table.integer("created_by")
        table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6))
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("menuitems")
}

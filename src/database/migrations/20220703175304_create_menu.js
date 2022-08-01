/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("menus", (table) => {
        table.increments("id")
        table.string("name")
        table.integer("branchId")
        table.json("menulist")
        table.enu("status", ["active", "inactive"]).defaultTo("active")
        table.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6))
        table.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6))
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("menus")
}

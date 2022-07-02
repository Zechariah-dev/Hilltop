/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("branches", function (table) {
    table.increments("id");
    table.string("address");
    table.integer("restuarant").notNullable();
    table.integer("manager").notNullable();
    table.datetime("createdAt", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("updatedAt", { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("branches");
};

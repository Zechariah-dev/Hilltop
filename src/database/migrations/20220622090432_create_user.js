/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("firstName");
    table.string("lastName");
    table.string("contact");
    table.date("hireDate");
    table.enu("gender", ["male", "female"]);
    table.enu("role", ["user", "waiter", "chef", "driver", "manager"]);
    table.integer("restuarant").nullable();
    table.datetime("createdAt", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("updatedAt", { precision: 6 }).defaultTo(knex.fn.now(6));

    table.primary(["id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

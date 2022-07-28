/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("restuarants").del()
    await knex("restuarants").insert([
        { id: 1, name: "Plaza del caple", ownerId: 1 },
        { id: 2, name: "Ivory Bites", ownerId: 1 },
    ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("menuitems").del()
    await knex("menuitems").insert([
        {
            name: "Apple Salad",
            price: 2000,
            category: "salad",
            description:
                "delicious apple salad made from the best apples produced",
            ingredients: JSON.stringify([
                "Honeycrisp Apple",
                "celery",
                "grapes",
                "pecans",
                "cranberries",
                "mayonnaise",
            ]),
            currency: "NGN",
            created_by: 1,
            id: 1,
        },
    ])
}

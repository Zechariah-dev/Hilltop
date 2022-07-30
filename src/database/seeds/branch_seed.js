/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("branches").del()
    await knex("branches").insert([
        {
            id: 1,
            address: "Corso Porta Nuova 45, Marola",
            restuarantId: 1,
            manager: 1,
        },
        {
            id: 2,
            address: " Via Giulio Camuzzoni 134, San Pantaleone",
            restuarantId: 1,
            manager: 1,
        },
        {
            id: 3,
            address: "27, Onilewura Street, Ikotun Egbe",
            restuarantId: 2,
            manager: 1,
        },
        {
            id: 4,
            address: "14, Nwala Street, Over-rail Abba",
            restuarantId: 2,
            manager: 1,
        },
        {
            id: 5,
            address: "16, Tola Adewunmi Close, Maryland, Ikeja",
            restuarantId: 2,
            manager: 1,
        },
    ])
}

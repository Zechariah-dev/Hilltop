/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("users").del()
    await knex("users").insert([
        {
            id: 1,
            email: "omoladefaith222@gmail.com",
            first_name: "faith",
            last_name: "omolade",
            contact: "08170269434",
            role: "manager",
            gender: "female",
            salt: "$2b$10$PA/wuHsJXHzPDyFJXDcfAe",
            password:
                "$2b$10$PA/wuHsJXHzPDyFJXDcfAe41po6eTH/4ZuJXxMVSeePJ7ZLHzrnMK",
        },
        {
            id: 2,
            email: "lawalsamuel21@gmail.com",
            first_name: "samuel",
            last_name: "lawal",
            contact: "09012344522",
            role: "user",
            gender: "male",
            salt: "$2b$10$PA/wuHsJXHzPDyFJXDcfAe",
            password:
                "$2b$10$PA/wuHsJXHzPDyFJXDcfAe41po6eTH/4ZuJXxMVSeePJ7ZLHzrnMK",
        },
    ])
}

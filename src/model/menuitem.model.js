const { Model } = require("objection")
const User = require("./user.model")

class MenuItem extends Model {
    static get tableName() {
        return "menuitems"
    }

    $beforeInsert() {
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    $beforeUpdate() {
        this.updated_at = new Date()
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "price"],
            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                rating: {
                    type: "object",
                    properties: {
                        1: { type: "number", default: 0 },
                        2: { type: "number", default: 0 },
                        3: { type: "number", default: 0 },
                        4: { type: "number", default: 0 },
                        5: { type: "number", default: 0 },
                    },
                },
                ingredients: {
                    type: "array",
                    default: [],
                },
                status: { type: "string" },
                currency: { type: "string" },
                created_by: { type: "number" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            },
        }
    }

    static get relationMappings() {
        return {
            created_by_user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: "menuitems.created_by",
                    to: "users.id",
                },
            },
        }
    }

    static findByName({ name }) {
        return this.query().findOne({ name })
    }
}

module.exports = MenuItem

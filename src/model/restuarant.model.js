const { Model } = require("objection")
const Branch = require("./branch.model")
const User = require("./user.model")

class Restuarant extends Model {
    static get tableName() {
        return "restuarants"
    }

    static get idColumn() {
        return "id"
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
            required: [],
            properties: {
                id: { type: "integer" },
                ownerId: { type: "integer" },
                name: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            },
        }
    }

    static get relationMappings() {
        return {
            owner: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: "restuarants.ownerId",
                    to: "users.id",
                },
            },
            branches: {
                relation: Model.HasManyRelation,
                modelClass: Branch,
                join: {
                    from: "restuarants.id",
                    to: "branches.restuarantId",
                },
            },
        }
    }
}

module.exports = Restuarant

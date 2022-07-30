const { Model } = require("objection")
const Restuarant = require("./restuarant.model")
const User = require("./user.model")

class Branch extends Model {
    static get tableName() {
        return "branches"
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
                addess: { type: "string" },
                manager: { type: "integer" },
                restuarantId: { type: "integer" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            },
        }
    }

    static get relationMappings() {
        return {
            managers: {
                relation: Model.HasOneRelation,
                modelClass: User,
                filter: (query) =>
                    query.select(
                        "id",
                        "email",
                        "firstName",
                        "lastName",
                        "contact",
                        "gender",
                        "role"
                    ),
                join: {
                    from: "branches.manager",
                    to: "users.id",
                },
            },
            restuarant: {
                relation: Model.BelongsToOneRelation,
                modelClass: Restuarant,
                join: {
                    from: "branches.restuarantId",
                    to: "restuarants.id",
                },
            },
        }
    }

    static findById({ branchId }) {
        return this.query().findById(branchId).throwIfNotFound({
            error: "not found",
        })
    }
}

module.exports = Branch

const { Model } = require("objection")
const { userServiceError } = require("../config/user.config")
const { BadRequestError } = require("../validation/errors")

class User extends Model {
    static get tableName() {
        return "users"
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

    $formatJson(json) {
        json = super.$formatJson(json)
        delete json.password
        delete json.salt
        delete json.created_at
        delete json.updated_at
        return json
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["email", "password"],
            properties: {
                id: { type: "integer" },
                email: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                password: { type: "string" },
                salt: { type: "string" },
                contact: { type: "string" },
                hire_date: { type: "string" },
                restuarant: { type: "integer" },
                role: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            },
        }
    }

    static findByEmail({ email }) {
        return this.query().findOne({ email })
    }
}

module.exports = User

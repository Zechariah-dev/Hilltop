const { Model } = require("objection")
const Branch = require("./branch.model")
const MenuItem = require("./menuitem.model")

class Menu extends Model {
    static get tableName() {
        return "menus"
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
                branchId: { type: "integer" },
                name: { type: "string" },
                menulist: { type: "array" },
                status: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            },
        }
    }

    static get relationMappings() {
        return {
            branch: {
                relation: Model.HasOneRelation,
                modelClass: Branch,
                join: {
                    from: "menus.branchId",
                    to: "branches.id",
                },
            },
            menu_items: {
                relation: Model.HasManyRelation,
                modelClass: MenuItem,
                join: {
                    from: "menus.id",
                    to: "menuitems.id",
                },
            },
        }
    }
}

module.exports = Menu

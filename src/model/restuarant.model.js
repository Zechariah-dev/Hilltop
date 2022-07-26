const { Model } = require("objection");
const User = require("./user.model");

class Restuarant extends Model {
  static get tableName() {
    return "restuarants";
  }

  static get idColumn() {
    return "id";
  }

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
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
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "restuarants.ownerId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Restuarant;

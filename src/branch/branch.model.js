const { Model } = require("objection");
const Restuarant = require("../restuarant/restuarant.model");
const User = require("../user/user.model");

class Branch extends Model {
  static get tableName() {
    return "branches";
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
        addess: { type: "string" },
        manager: { type: "integer" },
        restuarant: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      restuarants: {
        relation: Model.HasOneRelation,
        modelClass: Restuarant,
        join: {
          from: "branches.restuarant",
          to: "restuarants.id",
        },
      },
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
    };
  }
}

module.exports = Branch;

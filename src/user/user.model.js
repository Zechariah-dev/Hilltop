const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
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
      required: ["email", "contact"],
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        password: { type: "string" },
        contact: { type: "string" },
        hireDate: { type: "string" },
        restuarant: { type: "integer" },
        role: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }
}

module.exports = User;

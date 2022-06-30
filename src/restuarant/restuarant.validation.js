const { check } = require("express-validator");

exports.createValidation = [
  check("name").notEmpty().withMessage("name is requierd"),
];

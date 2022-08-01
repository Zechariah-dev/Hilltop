const { check } = require("express-validator")

exports.createValidation = [
    check("name").notEmpty().withMessage("name is required"),
    check("price")
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("price must be a number"),
    check("currency").default("NGN"),
    check("category").notEmpty().withMessage("category is required"),
    check("description").notEmpty().withMessage("Kindly leave a description"),
    check("ingredients")
        .isArray()
        .notEmpty()
        .withMessage("ingredients is required"),
]

exports.updateValidation = [
    check("name"),
    check("price"),
    check("currency"),
    check("category"),
    check("description"),
    check("ingredients"),
]

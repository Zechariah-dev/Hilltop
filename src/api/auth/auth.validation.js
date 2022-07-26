const { check } = require("express-validator")

exports.registerValidation = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be 8 character"),
    check("first_name").notEmpty().withMessage("firstname is required"),
    check("last_name").notEmpty().withMessage("lastname is required"),
    check("contact").notEmpty().withMessage("contact is required"),
    check("role").notEmpty().withMessage("role is required").isString(),
]

exports.loginValidation = [
    check("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be 8 character"),
]

const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const User = require("../../model/user.model")
const Restuarant = require("../../model/user.model")
const jwt = require("../../helpers/jwt")
const {
    BadRequestErrorWithPayload,
    BadRequestError,
    NotFoundError,
    AuthorizationError,
} = require("../../validation/errors")
const { globalErrors } = require("../../config/globals")
const { isEmployee, userServiceError } = require("../../config/user.config")
const { restuarantServiceError } = require("../../config/restuarant.config")
const config = require("../../config")

const AuthCtrl = {
    async register(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        const existingUser = await User.findByEmail({ email: req.body.email })

        if (existingUser) {
            throw new BadRequestError(
                userServiceError.USER_ERR_ALREADY_REGISTERED
            )
        }

        let payload = req.body

        if (isEmployee(req.body.role)) {
            payload.hire_date = new Date().toDateString()
        }

        payload.salt = await bcrypt.genSalt()
        payload.password = await bcrypt.hash(payload.password, payload.salt)

        if (isEmployee(req.body.role) && req.body.restuarant) {
            await Restuarant.query()
                .findById(req.body.restuarant)
                .throwIfNotFound({
                    error: new NotFoundError(
                        restuarantServiceError.RESTUARANT_ERR_RESTUARANT_NOT_FOUND
                    ),
                })
        }

        // insert user
        const user = await User.query().insert(payload)

        return res.status(201).json(user)
    },
    async login(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new BadRequestErrorWithPayload(
                globalErrors.GLOBAL_ERR_VALIDATION_ERROR,
                { errors: errors.array() }
            )
        }

        let user = await User.findByEmail({ email: req.body.email })

        if (!user) {
            throw new BadRequestError(userServiceError.USER_ERR_USER_NOT_FOUND)
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            throw new BadRequestError(
                userServiceError.USER_ERR_BCRYPT_PASSWORD_MISMATCH
            )
        }

        const tokens = jwt.getTokens(user)

        user = user.$formatJson(user)

        return res.json({ data: user, tokens })
    },
    async refreshToken(req, res) {
        const { refreshToken } = req.body

        const decoded = await jwt.validate(
            refreshToken,
            config.refreshTokenSecret
        )

        if (Date.now() >= decoded.exp * 1000) {
            throw new AuthorizationError(
                userServiceError.USER_ERR_TOKEN_EXPIRED
            )
        }

        const user = await User.query().findById(decoded.id)

        const tokens = await jwt.getTokens(user)

        return res.json(tokens)
    },
}

module.exports = AuthCtrl

const { Router } = require("express")
const AuthCtrl = require("./auth.ctrl")
const { registerValidation, loginValidation } = require("./auth.validation")
const asyncHandler = require("../../helpers/asyncHandler")

const router = Router()

router.post("/register", [registerValidation], asyncHandler(AuthCtrl.register))

router.post("/login", [loginValidation], asyncHandler(AuthCtrl.login))

router.post("/refresh-token", asyncHandler(AuthCtrl.refreshToken))

module.exports = router

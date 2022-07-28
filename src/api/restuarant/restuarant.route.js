const { Router } = require("express")
const RestuarantCtrl = require("./restuarant.ctrl")
const {
    createValidation,
    updateValidation,
} = require("./restuarant.validation")
const asyncHandler = require("../../helpers/asyncHandler")
const rbac = require("../../helpers/rbac")
const auth = require("../../middlewares/auth")

const router = Router()

router.post(
    "/",
    [createValidation, auth, rbac(["manager"])],
    asyncHandler(RestuarantCtrl.create)
)

router.delete(
    "/:restuarantId",
    [auth, rbac(["manager"])],
    asyncHandler(RestuarantCtrl.delete)
)

router.put(
    "/:restuarantId",
    [updateValidation, auth, rbac(["manager"])],
    asyncHandler(RestuarantCtrl.update)
)

router.get(
    "/user",
    [auth, rbac(["manager"])],
    asyncHandler(RestuarantCtrl.getUserRestuarants)
)

router.get("/", asyncHandler(RestuarantCtrl.getRestuarants))

module.exports = router

const { Router } = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const authorization = require("../../middlewares/auth")
const MenuController = require("./menu.ctrl")
const { createValidation } = require("./menu.validation")
const rbac = require("../../helpers/rbac")

const router = Router()

router.post(
    "/",
    [createValidation, authorization],
    asyncHandler(MenuController.create)
)

router.get("/:id", asyncHandler(MenuController.fetch))

router.get("/:id", asyncHandler(MenuController.fetchOne))

router.put(
    "/:id",
    [authorization, rbac(["manager", "chef"])],
    asyncHandler(MenuController.update)
)

router.delete(
    "/:id",
    [authorization, rbac(["manager", "chef"])],
    asyncHandler(MenuController.delete)
)

module.exports = router

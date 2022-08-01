const { Router } = require("express")
const MenuItemCtrl = require("./menuitem.ctrl")
const asyncHandler = require("../../helpers/asyncHandler")
const auth = require("../../middlewares/auth")
const rbac = require("../../helpers/rbac")
const { createValidation, updateValidation } = require("./menuitem.validation")

const router = Router()

router.post(
    "/",
    [createValidation, auth, rbac(["chef", "manager"])],
    asyncHandler(MenuItemCtrl.create)
)

router.get("/", asyncHandler(MenuItemCtrl.getAll))

router.get("/:id", asyncHandler(MenuItemCtrl.getOne))

router.delete(
    "/:id",
    [createValidation, auth, rbac(["chef", "manager"])],
    asyncHandler(MenuItemCtrl.delete)
)

router.put(
    "/:id",
    [updateValidation, auth, rbac(["chef", "manager"])],
    asyncHandler(MenuItemCtrl.update)
)

module.exports = router

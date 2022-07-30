const { Router } = require("express")
const BranchCtrl = require("./branch.ctrl")
const { createValidation, updateValidation } = require("./branch.validation")
const rbac = require("../../helpers/rbac")
const auth = require("../../middlewares/auth")
const asyncHandler = require("../../helpers/asyncHandler")

const router = Router()

router.post(
    "/create",
    [createValidation, auth, rbac(["manager"])],
    asyncHandler(BranchCtrl.create)
)

router.delete(
    "/:branchId",
    [auth, rbac(["manager"])],
    asyncHandler(BranchCtrl.deleteBranch)
)

router.get("/", asyncHandler(BranchCtrl.getAllBranches))

router.get("/resturant", asyncHandler(BranchCtrl.getRestuarantBranches))

router.put(
    "/:branchId",
    [updateValidation, auth, rbac(["manager"])],
    asyncHandler(BranchCtrl.updateBranch)
)

module.exports = router

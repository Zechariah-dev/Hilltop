const { Router } = require("express");
const RestuarantCtrl = require("./restuarant.ctrl");
const { createValidation } = require("./restuarant.validation");
const asyncHandler = require("../helpers/asyncHandler");
const rbac = require("../helpers/rbac");
const auth = require("../middlewares/auth");

const router = Router();

router.post(
  "/create",
  [createValidation, auth, rbac(["manager"])],
  asyncHandler(RestuarantCtrl.create)
);

module.exports = router;

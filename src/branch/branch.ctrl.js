const { validationResult } = require("express-validator");
const Restuarant = require("../restuarant/restuarant.model");
const Branch = require("./branch.model");

const BranchCtrl = {
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restuarant = await Restuarant.query().findById(
      req.query.restuarantId
    );

    if (!restuarant) {
      return res.status(400).json({ message: "restuarant not available" });
    }

    const conflictingAddress = await Branch.query().findOne({
      address: req.body.address,
    });

    if (conflictingAddress) {
      return res
        .status(400)
        .json({ message: "branch with conflicting address exists" });
    }

    const payload = {
      ...req.body,
      manager: req.user.id,
      restuarant: parseInt(req.query.restuarantId),
    };

    const branch = await Branch.query().insert(payload);

    return res.status(201).json({ data: branch });
  },
  async getAllBranches(req, res) {
    const restuarant = await Restuarant.query().findOne({
      id: req.query.restuarantId,
    });

    if (!restuarant) {
      return res.status(400).json({ message: "you dont own the restuarant" });
    }

    const branches = await Branch.query()
      .where("restuarant", req.query.restuarantId)
      .withGraphFetched("restuarants")
      .withGraphFetched("managers");

    return res.json({ data: branches });
  },
  async deleteBranch(req, res) {
    const branch = await Branch.query()
      .findById(req.params.branchId)
      .withGraphJoined("restuarants")
      .where("restuarants.ownerId", req.user.id)
      .delete();

    if (!branch) {
      return res.status(400).json({ message: "branch doesn't exist" });
    }

    return res.json({ message: "branch deleted" });
  },
  async updateBranch(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let branch = await Branch.query()
      .findById(req.params.branchId)
      .withGraphJoined("restuarants")
      .where("restuarants.ownerId", req.user.id);

    if (!branch) {
      return res.status(400).json({ message: "branch doesn't exist" });
    }

    branch = await Branch.query()
      .patchAndFetchById(req.params.branchId, req.body)
      .withGraphFetched("restuarants")
      .withGraphFetched("managers");

    return res.json({ data: branch });
  },
};

module.exports = BranchCtrl;

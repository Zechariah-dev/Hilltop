const { validationResult } = require("express-validator");
const Restuarant = require("./restuarant.model");

const RestuarantCtrl = {
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exsitingRestuarant = await Restuarant.query().findOne({
      name: req.body.name,
    });

    if (exsitingRestuarant) {
      return res
        .status(400)
        .json({ message: "restuarant with the provided name already exists" });
    }

    const restuarant = await Restuarant.query().insert({
      ...req.body,
      ownerId: req.user.id,
    });

    return res.status(201).json({ restuarant });
  },
};

module.exports = RestuarantCtrl;

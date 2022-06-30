const User = require("../user/user.model");
const Restuarant = require("../restuarant/restuarant.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("../helpers/jwt");
const _ = require("lodash");

const AuthCtrl = {
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.query().findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "account exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const payload = { ...req.body, password: hashedPassword };

    if (req.body.role !== "user" && req.body.role !== "manager") {
      payload.hireDate = new Date().toDateString();
    }

    if (
      req.body.role !== "user" &&
      req.body.role !== "manager" &&
      req.body.restuarant
    ) {
      const restuarant = await Restuarant.query().findById(req.body.restuarant);

      if (!restuarant) {
        return res.status(404).json({ messagee: "restuarant not found" });
      }
    }

    const user = await User.query().insert(payload);

    return res.status(201).json({ data: user });
  },
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.query().findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "account not registered" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "incorect password" });
    }

    const tokens = jwt.getTokens(user);

    user = _.omit(user, ["password"]);

    return res.json({ data: user, tokens });
  },
};

module.exports = AuthCtrl;

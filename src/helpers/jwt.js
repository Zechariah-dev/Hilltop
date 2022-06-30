const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  getTokens(user) {
    const payload = _.pick(user, ["id", "email", "role"]);
    const accessToken = jwt.sign(payload, config.accessTokenSecret, {
      expiresIn: "5h",
    });
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  },
  validate(token, secret) {
    return jwt.verify(token, secret);
  },
};

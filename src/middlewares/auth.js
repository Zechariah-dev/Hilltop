const { validate } = require("../helpers/jwt");
const { accessTokenSecret } = require("../config");

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "invalid token format" });
    }

    // eslint-disable-next-line no-unused-vars
    const [bearer, hash] = token.split(" ");

    const payload = validate(hash, accessTokenSecret);

    if (Date.now() >= payload.exp * 1000) {
      return res.status(401).json({ message: "access token expired" });
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;

const AuthRoute = require("./auth/auth.route");
const RestuarantRoute = require("./restuarant/restuarant.route");

module.exports = (app) => {
  app.use("/api/auth", AuthRoute);
  app.use("/api/restuarant", RestuarantRoute);
};

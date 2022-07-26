const AuthRoute = require("./api/auth/auth.route")
const RestuarantRoute = require("./api/restuarant/restuarant.route")
const BranchRoute = require("./api/branch/branch.route")
const MenuItemRoute = require("./api/menuitem/menuitem.route")

module.exports = (app) => {
    app.use("/api/auth", AuthRoute)
    app.use("/api/restuarant", RestuarantRoute)
    app.use("/api/branch", BranchRoute)
    app.use("/api/menuitem", MenuItemRoute)
}

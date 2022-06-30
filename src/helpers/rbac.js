const RoleGuard = (permissions) => (req, res, next) => {
  const userRole = req.user.role;
  if (!permissions.includes(userRole)) {
    return res.status(401).json({ message: "you are not authorized" });
  }

  next();
};

module.exports = RoleGuard;

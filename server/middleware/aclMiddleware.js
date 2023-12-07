const aclMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : null;

    if (userRole && allowedRoles.includes(userRole)) {
      next();
    } else {
      res
        .status(403)
        .json({ error: "Forbidden: Insufficient role permissions" });
    }
  };
};

module.exports = { aclMiddleware };

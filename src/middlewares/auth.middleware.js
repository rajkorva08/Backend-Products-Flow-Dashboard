// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(403).json({ message: "Token missing or invalid" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded payload to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient rights!" });
    }
    next();
  };
};

module.exports = authorizeRoles;

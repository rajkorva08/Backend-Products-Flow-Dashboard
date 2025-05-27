const jwt = require("jsonwebtoken");
const { JWT_ISSUER } = require("../config/constants");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      throw new Error("Token misssing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.iss !== JWT_ISSUER) {
      throw new Error("Invalid token issuer");
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;

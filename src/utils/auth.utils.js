const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ISSUER } = require("../config/constants");

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePassword = async (inputPassword, dbPassword) => {
  return await bcrypt.compare(inputPassword, dbPassword);
};

exports.generateToken = async (user) => {
  if (!user._id || !user.role || !user.email || !user.name) {
    throw new Error("Missing user fields for token");
  }

  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
    issuer: JWT_ISSUER,
  });
};

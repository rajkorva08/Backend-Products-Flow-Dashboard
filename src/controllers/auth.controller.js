const AuthService = require("../services/auth.service");
const { generateToken } = require("../utils/auth.utils");

exports.register = async (req, res, next) => {
  try {
    const result = await AuthService.registerUser(req.body);
    const token = await generateToken(result);
    return res.status(201).json({ result, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await AuthService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

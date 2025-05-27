const UserService = require("../services/user.service");
const verifyToken = require("../middlewares/verifyToken");

exports.getAllUsers = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await UserService.getAllUsersService(user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await UserService.getUserByIdService(req.params.id, user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await UserService.createUserService(req.body, user);
    return res.status(201).json({ status: 201, result });
  } catch (err) {
    next(err);
  }
};

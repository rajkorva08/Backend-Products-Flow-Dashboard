const db = require("../models/index");
const User = db.User;

const getAllUsersDao = async () => {
  const result = await User.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return result;
};

const getUserByIdDao = async (reqId) => {
  const result = await User.findByPk(reqId);
  return result;
};

const createUserDao = async (data) => {
  const result = await User.create(data);
  return result;
};

module.exports = {
  getAllUsersDao,
  getUserByIdDao,
  createUserDao,
};

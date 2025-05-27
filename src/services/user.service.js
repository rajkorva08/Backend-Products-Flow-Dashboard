const UserDao = require("../daos/user.dao");

const getAllUsersService = async (user) => {
  const result = await UserDao.getAllUsersDao();
  return result;
};

const getUserByIdService = async (reqId, user) => {
  const result = await UserDao.getUserByIdDao(reqId);
  return result;
};
const createUserService = async (reqBody, user) => {
  const result = await UserDao.createUserDao(reqBody);
  return result;
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
};

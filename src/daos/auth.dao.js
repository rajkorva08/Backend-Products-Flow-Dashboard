const db = require("../models/index");
const User = db.User;

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email, isDeleted: false } });
};

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = {
  findUserByEmail,
  createUser,
};

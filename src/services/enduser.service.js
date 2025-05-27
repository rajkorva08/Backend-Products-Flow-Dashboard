const EnduserDao = require("../daos/enduser.dao");

const getAllEndUser = async (user) => {
  const result = await EnduserDao.getAllEndUser();
  return result;
};

const getEndUserById = async (reqId, user) => {
  const result = await EnduserDao.getEndUserById(reqId);
  return result;
};

const createEndUser = async (reqBody, user) => {
  const result = await EnduserDao.createEndUser(reqBody);
  return result;
};

module.exports = {
  getAllEndUser,
  getEndUserById,
  createEndUser,
};

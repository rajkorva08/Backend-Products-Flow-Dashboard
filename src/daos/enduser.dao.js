const db = require("../models/index");
const EndUser = db.Enduser;

const getAllEndUser = async () => {
  const result = await EndUser.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return result;
};

const getEndUserById = async (reqId) => {
  const result = await EndUser.findByPk(reqId);
  return result;
};

const createEndUser = async (reqBody) => {
  const result = await EndUser.create(reqBody);
  return result;
};

module.exports = {
  getAllEndUser,
  getEndUserById,
  createEndUser,
};

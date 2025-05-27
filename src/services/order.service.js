const OrderDao = require("../daos/order.dao");

const getAllOrders = async (user) => {
  const result = await OrderDao.getAllOrders();
  return result;
};

const getOrderById = async (reqid, user) => {
  const result = await OrderDao.getOrderById(reqid);
  return result;
};

const createOrder = async (reqBody, user) => {
  const result = await OrderDao.createOrder(reqBody);
  return result;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};

const db = require("../models/index");
const Order = db.Order;

const getAllOrders = async () => {
  const result = await Order.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return result;
};

const getOrderById = async (reqId) => {
  const result = await Order.findByPk(reqId);
  return result;
};

const createOrder = async (reqBody) => {
  const result = await Order.create(reqBody);
  return result;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};

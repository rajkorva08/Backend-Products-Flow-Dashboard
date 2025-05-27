const db = require("../models/index");
const OrderItem = db.OrderItem;

const GetAllOrderItems = async () => {
  const result = await OrderItem.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return result;
};

const GetOrderItemById = async (reqId) => {
  const result = await OrderItem.findByPk(reqId);
  return result;
};

const createOrderItem = async (reqBody) => {
  const result = await OrderItem.create(reqBody);
  return result;
};

module.exports = {
  GetAllOrderItems,
  GetOrderItemById,
  createOrderItem,
};

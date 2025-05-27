const OrderItemsDao = require("../daos/orderItems.dao");

const GetAllOrderItems = async (user) => {
  const result = await OrderItemsDao.GetAllOrderItems();
  return result;
};

const GetOrderItemById = async (reqId, user) => {
  const result = await OrderItemsDao.GetOrderItemById(reqId);
  return result;
};

const createOrderItem = async (reqBody, user) => {
  const result = await OrderItemsDao.createOrderItem(reqBody);
  return result;
};

module.exports = {
  GetAllOrderItems,
  GetOrderItemById,
  createOrderItem,
};

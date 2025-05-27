const OrderItemsService = require("../services/orderItems.service");

exports.GetAllOrderItems = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await OrderItemsService.GetAllOrderItems(user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.GetOrderItemById = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await OrderItemsService.GetOrderItemById(
      req.params.id,
      user
    );
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await OrderItemsService.createOrderItem(req.body, user);
    return res.status(201).json({ status: 201, result });
  } catch (err) {
    next(err);
  }
};

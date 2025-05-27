const OrderService = require("../services/order.service");

exports.getAllOrders = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await OrderService.getAllOrders(user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await OrderService.getOrderById(req.params.id, user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await OrderService.createOrder(req.body, user);
    return res.status(201).json({ status: 201, result });
  } catch (err) {
    next(err);
  }
};

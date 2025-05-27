const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authorizeRoles = require("../middlewares/auth.middleware");
const verifyToken = require("../middlewares/verifyToken");

// Roles: "superAdmin", "productManager", "orderManager"
// Get All Orders
router.get(
  "/",
  verifyToken,
  authorizeRoles("superAdmin", "orderManager"),
  orderController.getAllOrders
);

// Get One Order By Id
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin", "orderManager"),
  orderController.getOrderById
);

// Post One Order
router.post(
  "/",
  verifyToken,
  authorizeRoles("superAdmin", "orderManager"),
  orderController.createOrder
);
module.exports = router;

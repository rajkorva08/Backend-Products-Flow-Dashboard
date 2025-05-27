const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItems.controller");
const authorizeRoles = require("../middlewares/auth.middleware");
const verifyToken = require("../middlewares/verifyToken");

// Roles: "superAdmin", "productManager", "orderManager"
// Get All OrderItems
router.get(
  "/",
  verifyToken,
  authorizeRoles("superAdmin", "orderManager"),
  orderItemController.GetAllOrderItems
);

// Get One OrderItems By Id
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin", "orderManager"),
  orderItemController.GetOrderItemById
);

// Post one OrderItem
router.post(
  "/",
  verifyToken,
  authorizeRoles("superAdmin", "orderManager"),
  orderItemController.createOrderItem
);

module.exports = router;

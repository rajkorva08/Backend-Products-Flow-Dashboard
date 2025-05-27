const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authorizeRoles = require("../middlewares/auth.middleware");
const verifyToken = require("../middlewares/verifyToken");

// Roles: "superAdmin", "productManager", "orderManager"
// Get All Products
router.get(
  "/",
  verifyToken,
  authorizeRoles("superAdmin", "productManager"),
  productController.getAllProducts
);

// Get One Product by Id
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin", "productManager"),
  productController.getProductById
);

// Post One Product
router.post(
  "/",
  verifyToken,
  authorizeRoles("superAdmin", "productManager"),
  productController.createProduct
);

// Update One Product
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin", "productManager"),
  productController.updateProduct
);

// Delete One product
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin", "productManager"),
  productController.deleteProduct
);

module.exports = router;

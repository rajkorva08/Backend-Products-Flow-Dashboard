const express = require("express");
const router = express.Router();
const endUserRoutes = require("../controllers/enduser.controller");
const authorizeRoles = require("../middlewares/auth.middleware");
const verifyToken = require("../middlewares/verifyToken");

// Roles: "superAdmin", "productManager", "orderManager"
// Get all EndUsers
router.get(
  "/",
  verifyToken,
  authorizeRoles("superAdmin"),
  endUserRoutes.getAllEndUser
);

// Get One EndUser by Id
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin"),
  endUserRoutes.getEndUserById
);

// Post One EndUser
router.post(
  "/",
  verifyToken,
  authorizeRoles("superAdmin"),
  endUserRoutes.createEndUser
);

module.exports = router;

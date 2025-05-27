const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authorizeRoles = require("../middlewares/auth.middleware");
const verifyToken = require("../middlewares/verifyToken");

// Roles: "superAdmin", "productManager", "orderManager"

// GET all users
router.get(
  "/",
  verifyToken,
  authorizeRoles("superAdmin"),
  userController.getAllUsers
);

// GET One user by Id
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("superAdmin"),
  userController.getUserById
);

// Post User
router.post(
  "/",
  verifyToken,
  authorizeRoles("superAdmin"),
  userController.createUser
);

module.exports = router;

const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRoles = require("../middlewares/auth.middleware");

router.get(
  "/counts",
  verifyToken,
  authorizeRoles("superAdmin", "productManager", "orderManager"),
  dashboardController.getDashboardCounts
);

module.exports = router;

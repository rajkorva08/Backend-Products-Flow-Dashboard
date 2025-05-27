const userRoutes = require("./user.routes");
const dashboardRoutes = require("./dashboard.routes");
const endUserRoutes = require("./enduser.routes");
const productRoutes = require("./product.routes");
const orderRoutes = require("./order.routes");
const orderitemRoutes = require("./orderItems.routes");
const authRoutes = require("./auth.routes");

module.exports = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/endusers", endUserRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/orderitems", orderitemRoutes);
  app.use("/api/auth", authRoutes);
};

// Roles: "superAdmin", "productManager", "orderManager"

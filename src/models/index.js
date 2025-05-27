/**
 * Load all models
 * Export everything as a single db object
 */
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; // This stores Sequelize library itself(not the connection) inside db object,
// so you can use Sequelize constants and types (like Sequelize.Op, Sequelize.fn(), etc.).

db.User = require("./user.model")(sequelize);
db.Enduser = require("./end-User.model")(sequelize);
db.Product = require("./product.model")(sequelize);
db.Order = require("./order.model")(sequelize);
db.OrderItem = require("./orderItems.model")(sequelize);

require("./associations")(db);
module.exports = db;

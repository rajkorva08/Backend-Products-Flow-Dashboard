module.exports = (db) => {
  // db.User, db.Enduser, db.Product, db.Order, db.OrderItem
  // Tble-Names => User, EndUser, Product, Order, OrderItems
  // hasMany, belongsTo, belongsToMany
  // Users <--> Products
  db.User.hasMany(db.Product, { foreignKey: "createdBy" });
  db.Product.belongsTo(db.User, { foreignKey: "createdBy" });

  // Product <--> OrderItems
  db.Product.hasMany(db.OrderItem, { foreignKey: "productId" });
  db.OrderItem.belongsTo(db.Product, { foreignKey: "productId" });

  // Order <--> OrderItems
  db.Order.hasMany(db.OrderItem, { foreignKey: "orderId" });
  db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

  // Orders <--> Enduser
  db.Enduser.hasMany(db.Order, { foreignKey: "enduserId" });
  db.Order.belongsTo(db.Enduser, {
    foreignKey: "enduserId",
  });
};

/**
 * We can directly connect Order <--> Products through OrderItems:
 * Many-to-many
 * db.Product.belongsToMany(db.Order, {
 *   through: db.OrderItem,
 *   foreignkey: 'productId',
 *   otherKey: 'orderId'
 * });
 *
 * db.Order.belongsToMany(db.Product, {
 *   through: db.OrderItem,
 *   foreignKey: 'OrderId',
 *   otherKey: 'ProductId'
 * });
 */

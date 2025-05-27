const db = require("../models");

const fetchCounts = async () => {
  const [productCount, orderCount, userCounts, endUserCount] =
    await Promise.all([
      db.Product.count({ where: { isDeleted: false } }),
      db.Order.count({ where: { isDeleted: false } }),
      db.User.count({ where: { isDeleted: false } }),
      db.Enduser.count({ where: { isDeleted: false } }),
    ]);

  return {
    products: productCount,
    orders: orderCount,
    users: userCounts,
    endUsers: endUserCount,
  };
};

module.exports = { fetchCounts };

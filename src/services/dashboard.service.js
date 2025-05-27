const DashboardDAO = require("../daos/dashboard.dao");

const getCounts = async (user) => {
  const counts = await DashboardDAO.fetchCounts();
  return counts;
};

module.exports = { getCounts };

const DashboardService = require("../services/dashboard.service");

exports.getDashboardCounts = async (req, res, next) => {
  try {
    const user = req.user; // Decoded token
    const result = await DashboardService.getCounts(user);

    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

const EnduserService = require("../services/enduser.service");

exports.getAllEndUser = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await EnduserService.getAllEndUser(user);

    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.getEndUserById = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await EnduserService.getEndUserById(req.params.id, user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.createEndUser = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await EnduserService.createEndUser(req.body, user);
    return res.status(201).json({ status: 201, result });
  } catch (err) {
    next(err);
  }
};

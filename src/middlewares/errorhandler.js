const validationMessages = require("../config/validationMessages");
const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  const user = req.user?.email || "anonymous";
  const endpoint = `${req.method} ${req.originalUrl}`;
  const isSequelizeError = err.name?.startsWith("Sequelize");
  const errorLabel = isSequelizeError ? "Sequelize Error" : "Unhandled Error";
  logger.error(
    `${errorLabel} by [${user}] on [${endpoint}] --> [${err.name}] ${err.message}`
  );

  // For Token Related Issues
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  // Sequelize unique constraint issue
  if (err.name === "SequelizeUniqueConstraintError") {
    let message;
    const field = err.errors?.[0]?.path;
    if (field && validationMessages[field]) {
      message = validationMessages[field];
    } else if (field) {
      message = validationMessages[field];
    } else {
      const indexKey = Object.keys(validationMessages).find((index) =>
        err.message.includes(index)
      );

      message = validationMessages[indexKey] || "Duplicate entry not allowed.";
    }
    return res.status(400).json({ message });
  }

  // Sequelize validation Issue (invalid data type, length, etc.)
  if (err.name == "SequelizeValidationError") {
    return res
      .status(400)
      .json({ message: err.errors?.[0]?.message || "Validation failed" });
  }

  // Foreign Key Constraint
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(409).json({
      message: "Invalid foreign key reference",
    });
  }

  // General DB Error
  if (err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      message: "Database error occurred",
    });
  }

  // Connection Error
  if (
    err.name === "SequelizeConnectionError" ||
    err.name === "SequelizeConnectionRefusedError"
  ) {
    return res.status(503).json({
      message: "Database connection failed",
    });
  }

  // Forbidden Errors (manually thrown by 'authorizeRoles')
  if (err.message === "Insufficient rights") {
    return res.status(403).json({ message: err.message });
  }

  // Missing required fields
  if (err.message?.toLowerCase().includes("missing")) {
    return res.status(400).json({ message: err.message });
  }

  // For any other Issues
  return res
    .status(500)
    .json({ message: err.message || "Internal Server Error" });
};

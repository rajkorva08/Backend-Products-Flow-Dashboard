const morgan = require("morgan");
const logger = require("../utils/logger");

// Creating a Morgan steam that helps to logs via winston
const stream = {
  write: (message) => logger.info(message.trim()),
};

// Middleware function
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

module.exports = requestLogger;

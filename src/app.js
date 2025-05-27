// Where you define and configure your Express app

const express = require("express"); // creates an instance of the Express app
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express(); // app object used to define routes, middleware, etc.

const requestLogger = require("./middlewares/requestLogger");
const logger = require("./utils/logger");
const errorhandler = require("./middlewares/errorhandler");

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:3000", // afdb front-end origin
    credentials: true, // allows cookies/token headers if needed
  })
);
app.use(express.json()); // Adds middleware to automatically parse JSON from incoming requests
app.use(cookieParser());
app.use(requestLogger);

// Importing routes
require("./routes/index")(app);

// After all routes functions
// after all route declarations. Since, it will handle after api hit
app.use(errorhandler);

module.exports = app;

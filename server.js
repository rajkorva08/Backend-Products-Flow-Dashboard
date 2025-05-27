// To listen to incoming HTTP requests PORT, HOST(Optional)
// Entry Point that starts your server and DB

require("dotenv").config();
const app = require("./src/app");
const db = require("./src/models/index");
const logger = require("./src/utils/logger");

const PORT = process.env.PORT || 5000;

//  .sync({ force: true }) -> to clear the data in the tables and update with new existing models

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(
        `Admin_Flow_Dashboard Server is up and running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    logger.error(`DB connection failed: ${err}`);
  });

/**
 * We are pulling dotenv into db.config.js file for flexibilty like
 * Separation of Concerns: .env holds config, db.config.js reads it, main app uses it
 *   now without touching the main code we can update database name, username, password
 *   host, or dialect. We just need to update in .env file. and we can use these
 *   environment vairbles across files.
 * Security: Secrets like Password and username... are not hardcoded in files
 *   instead, they are stored safely in .env, which is ignored by GIT(so they dont end up on git)
 * Easily Deployment or Environment-Friendly: we can switch between dev, test, prod environments
 *   just by editing the .env file for each setup.
 */
require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USER, // These user and Password is used by app to login to database, usually created by DeveOps.
  PASSWORD: process.env.DB_PASSWORD,
  DIALECT: process.env.DB_DIALECT,
  DB: process.env.DB_NAME,
  POOL: {
    // database connection pool configuration used DB performance
    max: 5, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Max time (in ms) Sequelize (or the DB client) will try to get a connection before throwing an error
    // nothing but the sequelize will wait to get a free connection from the pool before throwing an error.
    idle: 10000, // Max time (in ms) a connection can stay idle before being released
  },
};

/* Pool connection is like having number of pools to handle requests from users.
let's say if we have 100 user and they make request at same time we cannot create
100 connections to the DB that will effect he performance of Server and Overload DB 
and there by crashig app some times. Infact we do not need 100 connections, we might
only need 5-10 active DB connections. So these Pool Reuses connections instead of
creating new ones every time and Limits how many connections can be open at onc and
closes idle connections to save memory and Waits if all are busy, instead of crashing the app.
*/

/**
 * What is Database Connection Pooling?
 * First, Application uses a  driver to open a connection.
 *   --> App (Node.JS) uses a database driver (like mysql2, pg, or tedious for SQL Server).
 *       This driver knows how to speak the language of the database.
 *       Example: Sequelize uses mysql2 internally to connect to MYSQL.
 * Second, A network socket is opened between the application and the database.
 *   --> A TCP socket is established.
 *       This is how data travels between the app and the DB server (often over port 3306, 5432, or 1433 depending on DB).
 * Third, The database authenticates the user (DB_USER & DB_PASS).
 *   --> The DB checks if the provided username and password (from .env) are valid.
 *       If yes - connection is successful.
 *       If no  - error like ER_ACCESS_DENIED_ERROR(MySQL) or similar.
 * Fourth, Queries are executed, and operation is completed.
 *   --> The app sends SQL queries like SELECT, INSERT, etc.
 *       and DB processes them and sends back results.
 * Fifth, Connection is closed (or returned to pool).
 *   --> If you're not using a pool, the connection is closed immediately.
 *       If you're using a connection pool, the connection is returned to the pool for reuse.
 * Sixth, The network socket is closed (if not using a pool)
 *  --> Once the connection is closed (fully or from the pool), the TCP socket is closed.
 * NOTE: if using connectoin pooling, step 5 and 6 may be delayed or skipped,
 *       because connections are kept alive to serve the next request faster.
 */

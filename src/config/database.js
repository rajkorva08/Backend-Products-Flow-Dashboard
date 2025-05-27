/**
 * We are doing a setup or initialize Sequelize Connection
 */
const dbConfig = require("./db.config");
const { Sequelize, DataTypes } = require("sequelize");
const logger = require("../utils/logger");
// Sequelize is the main class used to connect and manage DB
// DataTypes are used to define your table columns (e.g., STRING, INTEGER, etc.)
// creating a Sequelize instance which is live connection to the database.
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT || 1433, // This is optional as Most of the Sequelize dialects have default ports (like SQL Server: 1433, MySQL: 3306, PostgreSQL: 5432), Sequelize doesn't need you to specify it.It will automatically connect using the standard port.
  pool: dbConfig.POOL,
  dialectModule: require("tedious"),
  dialect: dbConfig.DIALECT,
  dialectOptions: {
    options: {
      encrypt: false, // set to true for Azure
      trustServerCertificate: true,
    },
  },
  logging: (msg) => logger.info(`[SQL]: ${msg} `),
});

module.exports = sequelize;

// Database query to drop all the models and data:
// USE master
// GO

// ALTER DATABASE afdb_DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
// GO

// DROP DATABASE afdb_DB;
// GO

/// NOTE: do not from sync({force: true})

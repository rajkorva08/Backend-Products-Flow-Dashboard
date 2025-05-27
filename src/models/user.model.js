const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // or UUIDV1
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // This will check for only "null" values.
        validate: {
          notEmpty: { msg: "Username cannot be empty." }, // This will check for empty strings.
          len: {
            args: [3, 50],
            msg: "Username must be between 3 and 50 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty.",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("superAdmin", "productManager", "orderManager"),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role cannot be empty.",
          },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdBy: { type: DataTypes.UUID, allowNull: false, notEmpty: false },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // output: 2025-04-10T18:15:23.000Z
        allowNull: false, // This will avoid unexpected timestamps
      },
      updatedBy: { type: DataTypes.UUID, allowNull: false, notEmpty: true },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // output: 2025-04-10T18:15:23.000Z
        allowNull: false, // This will avoid unexpected timestamps
      },
    },
    {
      tableName: "User",
      defaultScope: {
        where: {
          isDeleted: false,
        },
      },
      indexes: [
        {
          unique: true,
          fields: ["email", "isDeleted"],
        },
      ],
    }
  );
};

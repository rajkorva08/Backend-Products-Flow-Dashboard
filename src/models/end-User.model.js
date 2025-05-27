const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "EndUser",
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
      phoneNumber: {
        type: DataTypes.STRING, // string is safer than INTEGER (to preserve leading 0's)
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone number is required." },
          is: {
            args: /^\+?[0-9\-]{10,15}$/, // /^[0-9]{10}$/ -> 10 - digit number only
            msg: "Phone number must be valid 10 digit number.",
          },
        },
      },
      address: { type: DataTypes.TEXT },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdBy: { type: DataTypes.UUID, allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // output: 2025-04-10T18:15:23.000Z
        allowNull: false, // This will avoid unexpected timestamps
      },
      updatedBy: { type: DataTypes.UUID, allowNull: false },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // output: 2025-04-10T18:15:23.000Z
        allowNull: false, // This will avoid unexpected timestamps
      },
    },
    {
      tableName: "EndUser",
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
        {
          unique: true,
          fields: ["phoneNumber", "isDeleted"],
        },
      ],
    }
  );
};

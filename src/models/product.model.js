const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Product",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // or UUIDV1
        unique: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        notEmpty: true,
        reference: {
          model: "User",
          key: "_id",
        },
      },

      productname: {
        type: DataTypes.STRING,
        allowNull: false, // This will check for only "null" values.
        validate: {
          notEmpty: { msg: "Product Name cannot be empty." }, // This will check for empty strings.
          len: {
            args: [1, 100],
            msg: "Product Name must be between 1 and 100 characters",
          },
        },
      },
      description: DataTypes.TEXT,
      price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },

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
      tableName: "Product",
      defaultScope: {
        where: {
          isDeleted: false,
        },
      },
      indexes: [
        {
          unique: true,
          fields: ["productname", "isDeleted"],
        },
      ],
    }
  );
};

const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class OrderItems extends Model {}

  OrderItems.init(
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // or UUIDV1
        unique: true,
        allowNull: false,
      },

      // Foriegn-Keys
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Product",
          key: "_id",
        },
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Order",
          key: "_id",
        },
      },

      unitQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      unitPrice: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },

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
      sequelize, // the connection
      modelName: "OrderItems", // model name
      tableName: "OrderItems", // optional: actual table name
      defaultScope: {
        where: {
          isDeleted: false,
        },
      },
      timestamps: true, // defalut is true
    }
  );
  return OrderItems;
};

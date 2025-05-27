const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // or UUIDV1
        unique: true,
        allowNull: false,
      },
      // Foriegn-Key
      enduserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "EndUser",
          key: "_id",
        },
      },

      totalOrderQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalOrderPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.ENUM,
        values: ["PLACED", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
        allowNull: false,
      },

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
      tableName: "Order",
      defaultScope: {
        where: {
          isDeleted: false,
        },
      },
    }
  );
};

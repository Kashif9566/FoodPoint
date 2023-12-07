const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Order = sequelize.define(
  "Order",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    address: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Order;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Dish = sequelize.define(
  "Dish",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Dish;

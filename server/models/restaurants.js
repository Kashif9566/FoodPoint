const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuisineType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Restaurant;

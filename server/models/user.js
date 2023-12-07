const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
      validate: {
        isIn: [["admin", "restaurantOwner", "user"]],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;

const User = require("./user");
const Restaurant = require("./restaurants");
const Dish = require("./dishes");
const Order = require("./order");

User.hasMany(Restaurant, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

Restaurant.belongsTo(User, { foreignKey: "userId" });
Restaurant.hasMany(Dish, { foreignKey: "restaurantId" });

Dish.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsToMany(Dish, { through: "OrderDish" });

Dish.belongsToMany(Order, { through: "OrderDish" });

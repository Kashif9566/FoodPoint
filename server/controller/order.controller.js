const Order = require("../models/order");
const Dish = require("../models/dishes");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { quantity, address, phoneNumber } = req.body;

    const dish = await Dish.findByPk(dishId);

    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    const userId = req.user.id;

    const order = await Order.create({
      quantity,
      address,
      phoneNumber,
      userId,
      dishId,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Dish, attributes: ["id", "name", "price"] },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

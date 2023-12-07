const Dish = require("../models/dishes");
const { aclMiddleware } = require("../middleware/aclMiddleware");

exports.createDish = async (req, res) => {
  const { name, description, price } = req.body;
  const RestaurantId = req.params.restaurantId;
  const image = req.file ? req.file.path : null;
  try {
    const newDish = await Dish.create({
      name: name,
      description: description,
      price: price,
      restaurantId: RestaurantId,
      image: image,
    });
    res.json(newDish);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllDishes = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const allDishes = await Dish.findAll({ where: { restaurantId } });
    res.json(allDishes);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllDishesOfAllUsers = async (req, res) => {
  try {
    const allDishesOfUsers = await Dish.findAll();
    res.json(allDishesOfUsers);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteDish = async (req, res) => {
  const { id } = req.params.dishId;
  try {
    await Dish.destroy({ where: { id } });
    res.json("dish deleted");
  } catch (error) {
    console.log(error);
  }
};

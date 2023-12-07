const Restaurant = require("../models/restaurants");
exports.createResturant = async (req, res) => {
  const { name, address, cuisineType, ratings } = req.body;
  const image = req.file ? req.file.path : null;
  const userId = req.params.userId;
  try {
    const newRestaurant = await Restaurant.create({
      name: name,
      address: address,
      cuisineType: cuisineType,
      ratings: ratings,
      image: image,
      userId: userId,
    });
    res.status(200).json(newRestaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllRestaurants = async (req, res) => {
  const userId = req.params.userId;
  try {
    const allRestaurants = await Restaurant.findAll({ where: { userId } });
    res.json(allRestaurants);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllRestaurantsOfAllUsers = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteRestaurant = async (req, res) => {
  const id = req.params.restaurantId;
  try {
    await Restaurant.destroy({ where: { id } });
    res.json("restaurant deleted");
  } catch (error) {
    console.log(error);
  }
};

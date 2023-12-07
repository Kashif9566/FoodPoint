const express = require("express");
const router = express.Router();
const dishesController = require("../controller/dishes.controller");
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");
const { aclMiddleware } = require("../middleware/aclMiddleware");
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/user/:userId/restaurant/:restaurantId/dish",
  protect,
  aclMiddleware(["admin", "restaurantOwner"]),
  upload.single("image"),
  dishesController.createDish
);

router.get(
  "/user/:userId/restaurant/:restaurantId/dish",
  protect,
  dishesController.getAllDishes
);

router.get("/allDishes", protect, dishesController.getAllDishesOfAllUsers);

router.delete(
  "/user/:userId/restaurant/:restaurantId/dish/:dishId",
  protect,
  aclMiddleware(["admin", "restaurantOwner"]),
  dishesController.deleteDish
);

module.exports = router;

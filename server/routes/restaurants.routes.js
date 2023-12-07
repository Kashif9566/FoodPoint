const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant.controller");
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
  "/user/:userId/restaurant",
  protect,
  aclMiddleware(["admin", "restaurantOwner"]),
  upload.single("image"),
  restaurantController.createResturant
);
router.get(
  "/user/:userId/restaurants",
  protect,
  restaurantController.getAllRestaurants
);
router.get(
  "/allRestaurants",
  protect,
  restaurantController.getAllRestaurantsOfAllUsers
);
router.delete(
  "/user/:userId/restaurant/:restaurantId",
  protect,
  aclMiddleware(["admin", "restaurantOwner"]),
  restaurantController.deleteRestaurant
);

module.exports = router;

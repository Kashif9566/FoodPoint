const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");
const { protect } = require("../middleware/authMiddleware");

router.post("/create/:dishId", protect, orderController.createOrder);

router.get("/get", protect, orderController.getOrdersByUser);

module.exports = router;

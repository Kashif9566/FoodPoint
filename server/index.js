const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const sequelize = require("./config/db.config");
const userRoutes = require("./routes/user.routes");
const restaurantsRoutes = require("./routes/restaurants.routes");
const dishesRoutes = require("./routes/dishes.routes");
const orderRoutes = require("./routes/order.routes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

dotenv.config();

app.use("/user", userRoutes);
app.use("/", restaurantsRoutes);
app.use("/", dishesRoutes);
app.use("/orders", orderRoutes);

require("./models/association");
sequelize.sync();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});

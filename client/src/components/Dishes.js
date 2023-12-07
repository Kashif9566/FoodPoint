import React from "react";
import { ContextState } from "../context/provider";
import { Link } from "react-router-dom";
import DishModel from "./DishModel";
const Dishes = () => {
  const { user, dishes, setSelectedDish } = ContextState();
  const handleSelectDish = (dish) => {
    setSelectedDish(dish);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
          marginRight: "10px",
        }}
      >
        {user.role === "restaurantOwner" || user.role === "admin" ? (
          <Link to={"/addDish"} className="btn btn-primary">
            Add New Dish
          </Link>
        ) : null}
      </div>
      <div className="container mt-4">
        <div className="row">
          {dishes &&
            dishes.map((dish) => (
              <div key={dish.id} className="col-md-6 mb-4">
                <DishModel
                  dish={dish}
                  onSelect={() => handleSelectDish(dish)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dishes;

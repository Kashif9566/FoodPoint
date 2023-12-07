import React, { useEffect } from "react";
import Restaurant from "../Restaurant";
import { ContextState } from "../../context/provider";
import axios from "axios";
import { Link } from "react-router-dom";
const MainPage = () => {
  const { user, restaurants, setRestaurants } = ContextState();

  const fetchRestaurants = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/allRestaurants",
        config
      );
      console.log(data);
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "5px",
          marginRight: "10px",
        }}
      >
        {user.role === "restaurantOwner" || user.role === "admin" ? (
          <Link to={"/addRestaurant"} className="btn btn-primary">
            Add Restaurant
          </Link>
        ) : null}
      </div>

      <div className="container mt-4">
        <div className="row">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Restaurant
                restaurant={restaurant}
                fetchRestaurants={fetchRestaurants}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;

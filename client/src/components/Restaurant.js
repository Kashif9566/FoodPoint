import axios from "axios";
import React, { useEffect, useState } from "react";
import { ContextState } from "../context/provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "@fontsource/open-sans";
const Restaurant = ({ restaurant, fetchRestaurants }) => {
  const { user, setDishes, setSelectedRestaurant } = ContextState();

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const deleteRestaurant = await axios.delete(
        `http://localhost:5000/user/${user.id}/restaurant/${id}`,
        config
      );
      if (deleteRestaurant) {
        toast.success("Restaurant deleted successfully!");
        fetchRestaurants();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting restaurant");
    }
  };
  const handleClickDishes = async (restaurantId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/user/${user.id}/restaurant/${restaurantId}/dish`,
        config
      );
      setDishes(data);
      setSelectedRestaurant(restaurantId);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleClickDishes(restaurant.id);
  }, [restaurant.id]);

  return (
    <div
      className="card shadow"
      style={{ width: "358.67px", height: "330px", borderRadius: "10px" }}
    >
      <div className="dropdown d-flex justify-content-end align-items-center">
        {user.role === "restaurantOwner" || user.role === "admin" ? (
          <button
            className="btn"
            type="button"
            id={`dropdownMenuButton-${restaurant.id}`}
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            ...
          </button>
        ) : null}

        <div
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton-${restaurant.id}`}
        >
          <button
            className="dropdown-item"
            onClick={() => handleDelete(restaurant.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <img
        src={`http://localhost:5000/${restaurant.image}`}
        className="card-img-top"
        alt={`${restaurant.name} Image`}
        style={{ height: "201.75px", padding: "8px", borderRadius: "10px" }}
      />
      <div className="card-body ">
        <div className="d-flex justify-content-between">
          <h1
            className="card-title"
            style={{
              fontSize: "16px",
              color: "#333333",
              margin: "0px 2px",
              fontWeight: "100px",
              fontFamily: "Open Sans",
            }}
          >
            {restaurant.name}
          </h1>
          <span
            style={{
              color: "#666666",
              fontSize: "12px",
              margin: "0px 0px 0px 2px",
            }}
          >
            {restaurant.rating}
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <div
            className="d-flex justify-content-start"
            style={{
              color: "#666666",
              fontSize: "12px",
              fontWeight: "100px",
              marginTop: "12px",
              marginLeft: "3px",
            }}
          >
            {/*<span>Location: {restaurant.address}</span>*/}
            <span>{restaurant.cuisineType}</span>
          </div>
          <div>
            <Link
              to={"/dishes"}
              className="btn btn-primary btn-sm"
              onClick={() => handleClickDishes(restaurant.id)}
              style={{ margin: "5px" }}
            >
              Visit Menu
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Restaurant;

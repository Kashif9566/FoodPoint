import React, { useEffect, useState } from "react";
import { ContextState } from "../../context/provider";
import axios from "axios";
import { Link } from "react-router-dom";
import Restaurant from "../Restaurant";
const Profile = () => {
  const { user } = ContextState();
  const [ownerRestaurant, setOwnerRestaurant] = useState([]);

  const fetchOwnerRestaurants = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/user/${user.id}/restaurants`,
        config
      );
      console.log(data);
      setOwnerRestaurant(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOwnerRestaurants();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        className="card shadow"
        style={{
          width: "550px",
          borderRadius: "10px",
          margin: "5px 5px",
        }}
      >
        <div className="text-center">
          <img
            src={`http://localhost:5000/${user.image}`}
            className="card-img-top rounded-circle"
            alt={`${user.name} Image`}
            style={{
              height: "200px",
              width: "200px",
              margin: "10px auto 0",
              border: "4px solid #fff",
            }}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">{user.email}</p>
          <div>
            {user.role === "restaurantOwner" || user.role === "admin" ? (
              <Link to={"/addRestaurant"} className="btn btn-primary">
                Add New Restaurant
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      {user.role === "restaurantOwner" || user.role === "admin" ? <hr /> : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
          margin: "10px",
        }}
      ></div>
      <div className="container mt-4">
        <div className="row">
          {ownerRestaurant.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Restaurant
                restaurant={restaurant}
                fetchRestaurants={fetchOwnerRestaurants}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

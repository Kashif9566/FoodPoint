import React from "react";
import { ContextState } from "../context/provider";
import { Link } from "react-router-dom";

const DishModel = ({ dish, onSelect }) => {
  const { user } = ContextState();

  return (
    <div
      className="card shadow"
      style={{ width: "550px", height: "38vh", borderRadius: "10px" }}
    >
      <div className="dropdown d-flex justify-content-end align-items-center">
        {user.role === "restaurantOwner" || user.role === "admin" ? (
          <button
            className="btn"
            type="button"
            id={`dropdownMenuButton-${dish.id}`}
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            ...
          </button>
        ) : null}

        <div
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton-${dish.id}`}
        >
          <button
            className="dropdown-item"
            //onClick={() => handleDelete(dish.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <img
          src={`http://localhost:5000/${dish.image}`}
          className="card-img-top"
          alt={`${dish.name} Image`}
          style={{
            height: "30vh",
            width: "250px",
            padding: "8px",
            borderRadius: "20px",
            marginTop: "7px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{dish.name}</h5>
          <hr />
          <p className="card-text">{dish.description}</p>
          <p className="card-text">Price: {dish.price}</p>
          {user.role === "restaurantOwner" || user.role === "admin" ? null : (
            <Link
              to={`/order/dish/${dish.id}`}
              className="btn btn-primary"
              onClick={() => onSelect()}
            >
              Order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishModel;

import React, { useState } from "react";
import { ContextState } from "../context/provider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [cuisineType, setCuisineType] = useState("");
  const { user } = ContextState();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !address || !rating || !cuisineType || !image) {
        toast.error("Please provide all fields");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("rating", rating);
      formData.append("cuisineType", cuisineType);
      formData.append("image", image);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/user/${user.id}/restaurant`,

        formData,
        config
      );

      if (data) {
        toast.success("Restaurant created successfully!");
        navigate("/profile");
      } else {
        toast.error("Error creating restaurant");
      }
    } catch (error) {
      toast.error("Error creating restaurant");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 ">
      <div className="card border-primary" style={{ width: "430px" }}>
        <div className="card-body">
          <h2>
            <b>Create Restaurant</b>
          </h2>
          <form>
            <div className="mb-1">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Address
              </label>
              <input
                type="address"
                className="form-control"
                id="email"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Cuisine
              </label>
              <input
                type="text"
                className="form-control"
                id="cuisine"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Rating
              </label>
              <input
                type="text"
                className="form-control"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="input"
              />
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRestaurant;

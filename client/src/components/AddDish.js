import React, { useState } from "react";
import { ContextState } from "../context/provider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDish = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { user, selectedRestaurant } = ContextState();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !description || !price || !image) {
        toast.error("Please provide all fields");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/user/${user.id}/restaurant/${selectedRestaurant}/dish`,
        formData,
        config
      );
      console.log(data);
      if (data) {
        toast.success("Dish created successfully!");
        navigate("/dishes");
      } else {
        toast.error("Error creating Dish");
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
            <b>Create New Dish</b>
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
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

export default AddDish;

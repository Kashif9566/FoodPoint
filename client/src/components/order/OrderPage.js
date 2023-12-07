import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextState } from "../../context/provider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, selectedDish } = ContextState();
  const navigate = useNavigate();

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };

  console.log("Quantity:", quantity);
  console.log("Address:", address);
  console.log("PhoneNumber:", phoneNumber);

  const handlePlaceOrder = async () => {
    try {
      if (!address || !phoneNumber) {
        toast.error("Please provide all required information.");
        return;
      }
      if (quantity === null || quantity <= 0) {
        toast.error("Please provide a valid quantity");
        return;
      }

      const requestData = {
        quantity,
        address,
        phoneNumber,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/orders/create/${selectedDish.id}`,
        requestData,
        config
      );

      if (data) {
        toast.success("Order created successfully!");
        navigate("/");
      } else {
        toast.error("Error creating order. Please try again.");
      }

      console.log("Placing order:", { quantity, address, phoneNumber });
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast.error("Error creating order. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow border-primary" style={{ width: "430px" }}>
        <div className="card-body">
          <h2>Details for Order: {selectedDish && selectedDish.name}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderPage;

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [fetchDishes, setFetchDishes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo && window.location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        dishes,
        setDishes,
        selectedDish,
        setSelectedDish,
        fetchDishes,
        setFetchDishes,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const ContextState = () => {
  return useContext(StateContext);
};

export default StateProvider;

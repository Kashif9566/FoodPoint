import "./App.css";
import HomePage from "./components/pages/HomePage";
import MainPage from "./components/pages/MainPage";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./components/profile/Profile";
import { ContextState } from "./context/provider";
import AddRestaurant from "./components/AddRestaurant";
import AddDish from "./components/AddDish";
import Dishes from "./components/Dishes";
import OrderPage from "./components/order/OrderPage";
function App() {
  const { user } = ContextState();

  return (
    <div className="App">
      {user && <Nav />}
      <Routes>
        <Route path="/login" element={<HomePage />} />
        {user ? (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addRestaurant" element={<AddRestaurant />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/addDish" element={<AddDish />} />
            <Route path="/order/dish/:dishId" element={<OrderPage />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;

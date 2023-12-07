import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary shadow"
        style={{ fontFamily: "Open Sans" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{
              fontFamily: "Open Sans",
              fontSize: "22px",
              fontWeight: "200px",
            }}
          >
            Food Point
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="nsavbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"}>
                  <button type="button" className="btn btn-outline-primary">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"}>
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                  >
                    Profile
                  </button>
                </Link>
              </li>
              <li
                className="nav-item"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;

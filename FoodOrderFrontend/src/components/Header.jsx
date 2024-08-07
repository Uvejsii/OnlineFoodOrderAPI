import { NavLink, useNavigate } from "react-router-dom";
import "../header.css";
import CartQuantity from "./CartQuantity";
import LoggedinUser from "./LoggedinUser";
import logo from "/public/food_order-logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../features/users/usersSlice";
import { List } from "react-bootstrap-icons";
import styled from "styled-components";

const HamburgerMenuItems = styled.div`
  width: 230px;
  top: 162%;
  right: -170%;
  background-color: #ff6536;
`;

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const Header = () => {
  const isAdminOn = useSelector((state) => state.users.isAdminOn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    const savedUser = loadUserFromLocalStorage();
    if (savedUser) {
      dispatch(setUser(savedUser));
    }
  }, [dispatch]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  return (
    <div className="header-wrapper fixed-top text-light d-flex justify-content-between align-items-center px-5 py-3 shadow">
      <div className="d-flex align-items-center gap-4">
        <img src={logo} alt="logo" onClick={handleLogoClick} className="logo" />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-header-link" : "inactive-header-link"
          }
        >
          Home
        </NavLink>
        {isAdminOn ? (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "active-header-link" : "inactive-header-link"
              }
            >
              Admin
            </NavLink>
            <NavLink
              to="/adminOrders"
              className={({ isActive }) =>
                isActive ? "active-header-link" : "inactive-header-link"
              }
            >
              Orders
            </NavLink>
          </>
        ) : null}
        <NavLink
          to="/orderStatus"
          className={({ isActive }) =>
            isActive ? "active-header-link" : "inactive-header-link"
          }
        >
          Order Status
        </NavLink>
      </div>
      <div className="d-flex align-items-center gap-4">
        <div className="user-options-wrapper">
          <LoggedinUser />
        </div>
        <div className="user-options-wrapper">
          <CartQuantity />
        </div>
      </div>
      <div className="hamburger-menu position-relative">
        <List className="fs-2" onClick={toggleHamburgerMenu} />
        {showHamburgerMenu && (
          <>
            <HamburgerMenuItems className="position-absolute shadow-lg rounded-3 p-3">
              <div className="d-flex justify-content-center">
                <LoggedinUser toggleHamburgerMenu={toggleHamburgerMenu} />
              </div>
              <div
                onClick={toggleHamburgerMenu}
                className="d-flex justify-content-center mt-5"
              >
                <CartQuantity />
              </div>
            </HamburgerMenuItems>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

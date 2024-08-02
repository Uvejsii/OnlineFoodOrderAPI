import { NavLink } from "react-router-dom";
import "../header.css";
import { AuthorizedUser } from "./AuthorizeView";
import CartQuantity from "./CartQuantity";
// import { logo } from "/public/food_order-logo.jpg";

const Header = () => {
  return (
    <div className="header-wrapper fixed-top text-light d-flex justify-content-between align-items-center px-5 py-3 shadow">
      <div className="d-flex align-items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-header-link" : "inactive-header-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/adminOrders"
          className={({ isActive }) =>
            isActive ? "active-header-link" : "inactive-header-link"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/orderStatus"
          className={({ isActive }) =>
            isActive ? "active-header-link" : "inactive-header-link"
          }
        >
          Order Status
        </NavLink>
      </div>
      <CartQuantity />
    </div>
  );
};

export default Header;

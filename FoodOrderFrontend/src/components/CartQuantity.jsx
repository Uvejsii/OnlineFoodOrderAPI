import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "../header.css";
import { fetchAllCartItems } from "../features/orders/ordersSlice";

const CartQuantity = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.orders.cartItems) || [];
  const user = useSelector((state) => state.users.user);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchAllCartItems());
    } else {
      setCartQuantity(0);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const totalCartQty = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setCartQuantity(totalCartQty);
    }
  }, [cartItems]);

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div onClick={goToCart} className="cart-qty-wrapper position-relative">
      <Cart2 className="fs-2" />
      <p className="cart-qty position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light shadow fw-bold">
        {cartQuantity}
      </p>
    </div>
  );
};

export default CartQuantity;

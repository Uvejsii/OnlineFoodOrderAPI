import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Cart2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "../header.css";

const CartQuantity = () => {
  const cartItems = useSelector((state) => state.orders.cartItems) || [];
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

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
      <p className="text-light position-absolute top-0 start-100 translate-middle fw-bold">
        {cartQuantity}
      </p>
    </div>
  );
};

export default CartQuantity;

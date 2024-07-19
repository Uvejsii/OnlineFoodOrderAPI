import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  fetchAllCartItems,
  getOrderTotal,
} from "../features/orders/ordersSlice";
import ProductsAddedToCart from "./ProductsAddedToCart";
import PlaceOrderForm from "./PlaceOrderForm";
import PaymentSummary from "./PaymentSummary";

const CartItems = () => {
  const dispatch = useDispatch();
  const [orderFormData, setOrderFormData] = useState({
    location: "",
    city: "",
    phoneNumber: "",
  });

  const cartItems = useSelector((state) => state.orders.cartItems);
  const subTotal = useSelector((state) => state.orders.subTotal);
  const orderTotal = useSelector((state) => state.orders.orderTotal);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderTotal());
  }, [dispatch, cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData({
      ...orderFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder(orderFormData));
    setOrderFormData({
      location: "",
      city: "",
      phoneNumber: "",
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch cart items. Please refresh the page.</p>;
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="d-flex gap-5 flex-wrap">
          {cartItems.map((item, index) => (
            <ProductsAddedToCart key={item.id || index} item={item} />
          ))}
        </div>
      ) : (
        <p>
          No items in the cart, click <Link to="/orderStatus">here</Link> to
          view your last order status
        </p>
      )}
      <div className="order d-flex gap-5 mt-5">
        <PlaceOrderForm
          handleSubmit={handleSubmit}
          orderFormData={orderFormData}
          handleChange={handleChange}
          orderTotal={orderTotal}
        />
        <PaymentSummary subTotal={subTotal} orderTotal={orderTotal} />
      </div>
    </>
  );
};

export default CartItems;

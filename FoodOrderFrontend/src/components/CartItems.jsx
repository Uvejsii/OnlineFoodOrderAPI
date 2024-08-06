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
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const UnauthorizedContainer = styled.div`
  margin: 220px 0;
`;

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

  const [fetchCartItemsError, setFetchCartItemsError] = useState(null);
  const [getOrderTotalError, setGetOrderTotalError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const resultAction = await dispatch(fetchAllCartItems());
      if (fetchAllCartItems.rejected.match(resultAction)) {
        setFetchCartItemsError(resultAction.payload);
      }
    };
    fetchCartItems();
  }, [dispatch]);

  useEffect(() => {
    const fetchOrderTotal = async () => {
      const resultAction = await dispatch(getOrderTotal());
      if (getOrderTotal.rejected.match(resultAction)) {
        setGetOrderTotalError(resultAction.payload);
      }
    };
    fetchOrderTotal();
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

  if (fetchCartItemsError === "NotFound" || getOrderTotalError === "NotFound") {
    return <p>Failed to fetch cart items. Please refresh the page.</p>;
  }

  if (
    fetchCartItemsError === "Unauthorized" ||
    getOrderTotalError === "Unauthorized"
  ) {
    return (
      <UnauthorizedContainer className="container text-center mx-auto">
        <h1>Please login to view your cart.</h1>
        <p className="m-0">
          Click <Link to="/login">here</Link> to login.
        </p>
        <p className="m-0">
          Dont have an account, click <Link to="/userRegister">here</Link> to
          register.
        </p>
      </UnauthorizedContainer>
    );
  }

  return (
    <div className="container my-4">
      {cartItems.length > 0 ? (
        <motion.div
          className="d-flex flex-wrap gap-4 justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cartItems.map((item, index) => (
            <ProductsAddedToCart key={item.id || index} item={item} />
          ))}
        </motion.div>
      ) : (
        <p className="mt-5 pt-5 text-center">
          No items in the cart, click <Link to="/orderStatus">here</Link> to
          view your last order status
        </p>
      )}
      <div className="order d-flex flex-column flex-md-row gap-5 mt-5 pt-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow-1"
        >
          <PlaceOrderForm
            handleSubmit={handleSubmit}
            orderFormData={orderFormData}
            handleChange={handleChange}
            orderTotal={orderTotal}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-grow-1"
        >
          <PaymentSummary subTotal={subTotal} orderTotal={orderTotal} />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItems;

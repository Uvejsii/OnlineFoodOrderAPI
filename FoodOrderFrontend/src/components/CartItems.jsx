import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  fetchAllCartItems,
  getOrderTotal,
} from "../features/orders/ordersSlice";
import HandleIncrementButton from "./HandleIncrementButton";
import HandleDecrementButton from "./HandleDecrementButton";
import HandleRemoveCartItemButton from "./handleRemoveCartItemButton";

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
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch cart items. Please refresh the page.</p>;
  }

  return (
    <>
      <div className="d-flex gap-5 flex-wrap">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="border p-2">
              <p>ID: {item.productId}</p>
              <img src={item.imageUrl} alt={`${item.name} image`} />
              <h5>{item.name}</h5>
              <p>€ {item.price.toFixed(2)}</p>
              <div className="d-flex align-items-center">
                <span className="me-2">QTY:</span>
                <HandleDecrementButton product={item} />
                <p className="m-0 mx-2 fw-semibold">{item.quantity}</p>
                <HandleIncrementButton product={item} />
              </div>
              <p>Type: {item.productType}</p>
              <HandleRemoveCartItemButton product={item} />
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <div className="order d-flex gap-5 mt-5">
        <div>
          <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Location"
              className="form-control"
              name="location"
              required
              value={orderFormData.location}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="City"
              className="form-control"
              name="city"
              required
              value={orderFormData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control"
              name="phoneNumber"
              required
              value={orderFormData.phoneNumber}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-success fw-semibold w-100"
              disabled={orderTotal < 5 ? true : null}
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="border">
          <h4 className="text-primary">
            Sub Total: € {subTotal !== undefined ? subTotal.toFixed(2) : "0.00"}
          </h4>
          <h6>Transport: € {subTotal > 0 ? "1.00" : "0.00"} </h6>
          <h4>Total: € {orderTotal.toFixed(2)}</h4>
          <hr />
          <h6>Minimum order € 5.00</h6>
        </div>
      </div>
    </>
  );
};

export default CartItems;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "../features/orders/ordersSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.orders.cartItems);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  const handleItemDelete = (product) => {
    dispatch(
      removeFromCart({
        productId: product.productId,
        productType: product.productType,
      })
    );
  };

  const handleIncrement = (product) => {
    dispatch(
      updateCartItemQuantity({
        productId: product.productId,
        change: 1,
        productType: product.productType,
      })
    );
  };

  const handleDecrement = (product) => {
    if (product.quantity == 1) return;

    dispatch(
      updateCartItemQuantity({
        productId: product.productId,
        change: -1,
        productType: product.productType,
      })
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch cart items. Please refresh th page.</p>;
  }

  return (
    <div className="d-flex gap-5 flex-wrap">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="border p-2">
            <p>ID: {item.productId}</p>
            <img src={item.imageUrl} alt={`${item.name} image`} />
            <h5>Name: {item.name}</h5>
            <p>Price: € {item.price}</p>
            <div className="d-flex align-items-center">
              <span className="me-2">QTY:</span>
              <button
                className="btn btn-warning fw-semibold"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>
              <p className="m-0 mx-2 fw-semibold">{item.quantity}</p>
              <button
                className="btn btn-primary fw-semibold"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>
            <p>Type: {item.productType}</p>
            <button
              className="btn btn-danger fw-semibold w-100"
              onClick={() => handleItemDelete(item)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default CartItems;

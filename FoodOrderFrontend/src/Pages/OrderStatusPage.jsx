import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastOrder } from "../features/orders/ordersSlice";
import GoToAdminPageButton from "../components/GoToAdminPageButton";

const OrderStatusPage = () => {
  const dispatch = useDispatch();
  const lastOrder = useSelector((state) => state.orders.lastOrder);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(getLastOrder());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch the last order. Please try again later.</p>;
  }

  if (!lastOrder || !lastOrder.orderItems) {
    return <p>No last order found.</p>;
  }

  return (
    <div className="container">
      <GoToAdminPageButton />
      <div>
        <h6>Order Status: {lastOrder.status}</h6>
        <h6>Ordered On: {lastOrder.orderDate}</h6>
        <h6>City: {lastOrder.city}</h6>
        <h5>Location: {lastOrder.location}</h5>
        <h6>Total: € {lastOrder.totalAmount.toFixed(2)}</h6>
      </div>
      <div>
        <h6>Your order items</h6>
        <div className="d-flex">
          {lastOrder.orderItems.map((item, index) => (
            <div key={index}>
              <img src={item.imageUrl} alt="" />
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>€ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;

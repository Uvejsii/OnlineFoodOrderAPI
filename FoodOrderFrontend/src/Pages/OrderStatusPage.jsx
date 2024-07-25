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

  // useEffect(() => {
  //   if (lastOrder && lastOrder.status !== undefined) {
  //     console.log("Order Status", lastOrder.status);
  //   }
  // }, [lastOrder]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to fetch the last order. Please try again later.</p>;
  }

  if (!lastOrder || !lastOrder.orderItems) {
    return <p>No last order found.</p>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const orderStatusToText = (orderStatus) => {
    switch (orderStatus) {
      case 0:
        return "Pending";
      case 1:
        return "Preparing";
      case 2:
        return "Underway";
      case 3:
        return "Delivered";
      default:
        return "Unknown Status";
    }
  };

  return (
    <div className="container">
      <GoToAdminPageButton />
      <div>
        <h6>
          Order Status:{" "}
          <span className="text-success fw-bold">
            {lastOrder.status !== undefined
              ? orderStatusToText(lastOrder.status)
              : "N/A"}
          </span>
        </h6>
        <h6>
          Ordered On:{" "}
          {lastOrder.orderDate ? formatDate(lastOrder.orderDate) : "N/A"}
        </h6>
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
              <p>Qty: x{item.quantity}</p>
              <p>€ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;

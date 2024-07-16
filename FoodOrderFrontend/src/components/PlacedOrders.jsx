import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/orders/ordersSlice";

const PlacedOrders = () => {
  const disptach = useDispatch();
  const orders = useSelector((state) => state.orders.adminOrders);

  useEffect(() => {
    disptach(getOrders());
  }, [disptach]);

  return (
    <>
      <ul>
        orders:
        {orders.map((order) => (
          <li key={order.id}>
            order id: {order.id} - {order.orderItems.map((oi) => oi.name)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PlacedOrders;

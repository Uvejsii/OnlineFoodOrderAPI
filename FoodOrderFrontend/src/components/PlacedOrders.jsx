import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/orders/ordersSlice";
import GoToAdminPageButton from "./GoToAdminPageButton";

const PlacedOrders = () => {
  const disptach = useDispatch();
  const orders = useSelector((state) => state.orders.adminOrders);

  useEffect(() => {
    disptach(getOrders());
  }, [disptach]);

  return (
    <>
      <GoToAdminPageButton />
      <ul>
        orders:
        {orders.map((order) => (
          <li key={order.id} className="border-bottom">
            order details: {order.userEmail} -
            {order.orderItems.map((oi, index) => (
              <span key={index}>
                {" "}
                {oi.name} x{oi.quantity},
              </span>
            ))}
            {" - "}
            total amount - € {order.totalAmount.toFixed(2)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PlacedOrders;

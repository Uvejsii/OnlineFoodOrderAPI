import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderItems } from "../features/orders/ordersSlice";

const PlacedOrderItems = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.orders.adminOrderItems);

  useEffect(() => {
    dispatch(getOrderItems());
  }, [dispatch]);

  return (
    <>
      <ul>
        order items
        {orderItems.map((orderItem) => (
          <li key={orderItem.id}>
            {orderItem.name} x{orderItem.quantity}
          </li>
        ))}
      </ul>
    </>
  );
};
export default PlacedOrderItems;

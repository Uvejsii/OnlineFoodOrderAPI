import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../features/orders/ordersSlice";

const HandleDecrementButton = ({ product }) => {
  const dispatch = useDispatch();

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

  return (
    <button
      className="btn btn-warning fw-semibold"
      onClick={() => handleDecrement(product)}
    >
      -
    </button>
  );
};

export default HandleDecrementButton;

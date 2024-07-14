import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../features/orders/ordersSlice";

const HandleIncrementButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    dispatch(
      updateCartItemQuantity({
        productId: product.productId,
        change: 1,
        productType: product.productType,
      })
    );
  };

  return (
    <button
      className="btn btn-primary fw-semibold"
      onClick={() => handleIncrement(product)}
    >
      +
    </button>
  );
};

export default HandleIncrementButton;

import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/orders/ordersSlice";

const HandleRemoveCartItemButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleItemDelete = (product) => {
    dispatch(
      removeFromCart({
        productId: product.productId,
        productType: product.productType,
      })
    );
  };
  return (
    <button
      className="btn btn-danger fw-semibold w-100"
      onClick={() => handleItemDelete(product)}
    >
      Remove
    </button>
  );
};

export default HandleRemoveCartItemButton;

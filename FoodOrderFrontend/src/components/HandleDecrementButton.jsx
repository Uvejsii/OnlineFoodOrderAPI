import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../features/orders/ordersSlice";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    toast.info("Item Quantity Decreased", {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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

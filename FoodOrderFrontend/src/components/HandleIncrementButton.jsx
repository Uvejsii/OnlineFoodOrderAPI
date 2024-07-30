import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../features/orders/ordersSlice";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    toast.info("Item Quantity Increased", {
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
      className="btn btn-primary fw-semibold"
      onClick={() => handleIncrement(product)}
    >
      +
    </button>
  );
};

export default HandleIncrementButton;

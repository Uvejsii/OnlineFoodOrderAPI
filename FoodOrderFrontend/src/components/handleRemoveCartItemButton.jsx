import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/orders/ordersSlice";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HandleRemoveCartItemButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleItemDelete = (product) => {
    dispatch(
      removeFromCart({
        productId: product.productId,
        productType: product.productType,
      })
    );

    toast.success("Removed From Cart!", {
      position: "top-right",
      autoClose: 1000,
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
      className="btn btn-danger fw-semibold w-100"
      onClick={() => handleItemDelete(product)}
    >
      Remove
    </button>
  );
};

export default HandleRemoveCartItemButton;

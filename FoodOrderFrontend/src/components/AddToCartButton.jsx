import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchAllCartItems } from "../features/orders/ordersSlice";
import "/src/productDetail.css";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ product, isHomePage }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.orders.error);
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    const cartItem = {
      productId: product.id,
      productType: product.category,
      quantity: 1,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    const resultAction = await dispatch(addToCart(cartItem));

    if (
      addToCart.rejected.match(resultAction) &&
      resultAction.payload === "Unauthorized"
    ) {
      toast.info("Login To Add Items To Cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/login");
    } else {
      await dispatch(fetchAllCartItems());
      toast.success("Added To Cart!", {
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
    }
  };

  return (
    <button
      className={isHomePage ? "home-add-to-cart-btn w-100" : "add-to-cart-btn"}
      onClick={() => handleAddToCart(product)}
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;

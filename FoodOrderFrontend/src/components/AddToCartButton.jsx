import { useDispatch } from "react-redux";
import { addToCart, fetchAllCartItems } from "../features/orders/ordersSlice";
import "/src/productDetail.css";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButton = ({ product, isHomePage }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    const cartItem = {
      productId: product.id,
      productType: product.category,
      quantity: 1,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    await dispatch(addToCart(cartItem));
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

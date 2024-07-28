import { useDispatch } from "react-redux";
import { addToCart, fetchAllCartItems } from "../features/orders/ordersSlice";
import "/src/productDetail.css";

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

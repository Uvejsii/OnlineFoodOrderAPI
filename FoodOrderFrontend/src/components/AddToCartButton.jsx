import { useDispatch } from "react-redux";
import { addToCart, fetchAllCartItems } from "../features/orders/ordersSlice";

const AddToCartButton = ({ product }) => {
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
      className="btn btn-info w-100 fw-semibold"
      onClick={() => handleAddToCart(product)}
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;

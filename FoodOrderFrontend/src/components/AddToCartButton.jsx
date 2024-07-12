import { useDispatch } from "react-redux";
import { addToCart } from "../features/orders/ordersSlice";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const cartItem = {
      productId: product.id,
      productType: product.category,
      quantity: 1,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    dispatch(addToCart(cartItem));
  };

  return (
    <button
      className="btn btn-info w-100"
      onClick={() => handleAddToCart(product)}
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;

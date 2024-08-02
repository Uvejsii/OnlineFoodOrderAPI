import HandleIncrementButton from "./HandleIncrementButton";
import HandleDecrementButton from "./HandleDecrementButton";
import HandleRemoveCartItemButton from "./handleRemoveCartItemButton";

const ProductsAddedToCart = ({ item }) => {
  return (
    <>
      <div className="border rounded shadow-sm p-3">
        <div className="d-flex">
          <img
            src={item.imageUrl}
            alt={`${item.name} image`}
            className="w-50 mx-auto"
          />
        </div>
        <h6>{item.name}</h6>
        <p className="m-0">€ {item.price.toFixed(2)}</p>
        <div className="d-flex align-items-center">
          <span className="me-2">QTY:</span>
          <HandleDecrementButton product={item} />
          <p className="m-0 mx-2 fw-semibold">{item.quantity}</p>
          <HandleIncrementButton product={item} />
        </div>
        <p>Type: {item.productType}</p>
        <HandleRemoveCartItemButton product={item} />
      </div>
    </>
  );
};

export default ProductsAddedToCart;

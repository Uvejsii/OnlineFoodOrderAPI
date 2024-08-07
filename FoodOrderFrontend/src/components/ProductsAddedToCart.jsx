import HandleIncrementButton from "./HandleIncrementButton";
import HandleDecrementButton from "./HandleDecrementButton";
import HandleRemoveCartItemButton from "./handleRemoveCartItemButton";
import styled from "styled-components";

const ItemPrice = styled.p`
  color: #ff6536;
`;

const ProductsAddedToCart = ({ item }) => {
  return (
    <div className="added-product col-xl-6 col-lg-6 col-md-12 col-xs-12">
      <div className="row-cols-1 row-cols-2 g-4 d-flex justify-content-center">
        <div className="col-11 col-md-11 col-sm-12">
          <div className="card mb-4 shadow-lg">
            <div className="row g-0">
              <div className="col-md-4 d-flex align-items-center justify-content-center rounded">
                <img
                  src={item.imageUrl}
                  alt={`${item.name} image`}
                  className="card-img img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{item.name}</h5>
                  <ItemPrice className="card-text fw-bold">
                    € {item.price.toFixed(2)}
                  </ItemPrice>
                  <p className="card-text fw-bold">
                    Qty <HandleDecrementButton product={item} />
                    <span className="mx-2">{item.quantity}</span>
                    <HandleIncrementButton product={item} />
                  </p>
                  <HandleRemoveCartItemButton product={item} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsAddedToCart;

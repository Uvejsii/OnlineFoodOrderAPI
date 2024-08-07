import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClickedDrink } from "../features/products/drink/drinkSlice";
import "/src/productDetail.css";
import AddToCartButton from "../components/AddToCartButton";

const DrinkDetail = () => {
  const dispatch = useDispatch();
  const drink = useSelector((state) => state.drinks.clickedDrink);
  const drinkData = useSelector((state) => state.drinks);
  const isLoading = useSelector((state) => state.drinks.isLoading);
  const error = useSelector((state) => state.drinks.error);
  const { drinkId } = useParams();

  useEffect(() => {
    dispatch(getClickedDrink(drinkId));
  }, [drinkId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching drink please refresh the page</p>;
  }

  if (!drink || !drink.price) {
    return <p>Drink not found or missing data</p>;
  }

  return (
    <div className="product-detail-container vh-100 d-flex">
      <section className="product container col-xl-8 col-lg-9 shadow-lg my-5">
        <div className="product__photo">
          <div className="photo-container">
            <div className="photo-main d-flex justify-content-center align-items-center rounded">
              <img
                src={drink.imageUrl}
                alt={`${drink.name} image`}
                className="rounded-circle h-75"
              />
            </div>
          </div>
        </div>
        <div className="product__info">
          <div className="title">
            <h1>{drink.name}</h1>
            <span>COD: {drink.id}</span>
          </div>
          <div className="price">
            € <span>{drink.price.toFixed(2)}</span>
          </div>
          <div className="rating">Stars: {drink.rating}</div>
          <div className="description pe-3">
            <h3>Description</h3>
            <p>{drink.description}</p>
          </div>
          <AddToCartButton product={drink} />
        </div>
      </section>
    </div>
  );
};

export default DrinkDetail;

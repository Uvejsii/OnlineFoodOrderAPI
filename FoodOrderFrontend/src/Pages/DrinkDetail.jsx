import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClickedDrink } from "../features/products/drink/drinkSlice";
import GoToAdminPageButton from "../components/GoToAdminPageButton";
import GoToHomePageButton from "../components/GoToHomePageButton";

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
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="drink-detail-wrapper">
          <div className="navigate-btns d-flex gap-5">
            <GoToAdminPageButton />
            <GoToHomePageButton />
          </div>
          <div className="drink-detail-container border">
            <img src={drink.imageUrl} alt={`${drink.imageUrl} image`} />
            <h5>Raing: {drink.rating}</h5>
            <h1>{drink.name}</h1>
            <h5>{drink.description}</h5>
            <h5>Price: € {drink.price.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinkDetail;

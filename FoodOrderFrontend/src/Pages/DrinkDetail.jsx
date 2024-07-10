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
  const { drinkId } = useParams();

  useEffect(() => {
    dispatch(getClickedDrink(drinkId));
  }, [drinkId]);
  return (
    <>
      {drinkData.isLoading ? (
        <h1>Loading...</h1>
      ) : (
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
              <h5>Price: {drink.price}$</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrinkDetail;

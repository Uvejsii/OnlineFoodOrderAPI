import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrinks } from "../src/features/products/drink/drinkSlice";
import DrinkListing from "./DrinkListing";
import { useNavigate } from "react-router-dom";

const DrinkListings = () => {
  const dispatch = useDispatch();
  const drinkData = useSelector((state) => state.drinks);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  const goToDrink = (drinkId) => {
    navigate(`/drink/${drinkId}`);
  };
  return (
    <>
      {drinkData.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        drinkData.drinks.map((drink) => (
          <DrinkListing key={drink.id} drink={drink} goToDrink={goToDrink} />
        ))
      )}
    </>
  );
};

export default DrinkListings;

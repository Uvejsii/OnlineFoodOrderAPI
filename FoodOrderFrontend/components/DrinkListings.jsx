import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrinks } from "../src/features/products/drink/drinkSlice";
import DrinkListing from "./DrinkListing";
import { useNavigate } from "react-router-dom";

const DrinkListings = ({ drinks, isHomePage }) => {
  const dispatch = useDispatch();
  const drinkData = useSelector((state) => state.drinks);
  const navigate = useNavigate();
  const filter = useSelector((state) => state.filter.currentFilter);

  useEffect(() => {
    if (filter === "Drink" || filter === "Filter All") {
      dispatch(fetchDrinks());
    }
  }, [dispatch, filter]);

  if (drinkData.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (filter !== "Drink" && filter !== "Filter All") {
    return null;
  }

  const goToDrink = (drinkId) => {
    navigate(`/drink/${drinkId}`);
  };
  return (
    <>
      {drinks.map((drink) => (
        <DrinkListing
          key={drink.id}
          drink={drink}
          goToDrink={goToDrink}
          isHomePage={isHomePage}
        />
      ))}
    </>
  );
};

export default DrinkListings;

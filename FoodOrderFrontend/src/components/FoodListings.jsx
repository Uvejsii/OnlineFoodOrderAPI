import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../features/products/food/foodSlice";
import { useEffect } from "react";
import FoodListing from "./FoodListing";
import { useNavigate } from "react-router-dom";

const FoodListings = ({ foods, isHomePage }) => {
  const dispatch = useDispatch();
  const FoodData = useSelector((state) => state.foods);
  const filter = useSelector((state) => state.filter.currentFilter);

  const navigate = useNavigate();

  useEffect(() => {
    if (filter === "Food" || filter === "Filter All") {
      dispatch(fetchFoods());
    }
  }, [dispatch, filter]);

  if (FoodData.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (filter !== "Food" && filter !== "Filter All") {
    return null;
  }

  const goToFood = (foodId) => {
    navigate(`/food/${foodId}`);
  };
  return (
    <>
      {foods.map((food) => (
        <FoodListing
          key={food.id}
          food={food}
          goToFood={goToFood}
          isHomePage={isHomePage}
        />
      ))}
    </>
  );
};

export default FoodListings;

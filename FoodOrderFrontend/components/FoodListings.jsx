import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../src/features/products/food/foodSlice";
import { useEffect } from "react";
import FoodListing from "./FoodListing";
import { useNavigate } from "react-router-dom";

const FoodListings = () => {
  const dispatch = useDispatch();
  const FoodData = useSelector((state) => state.foods);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const goToFood = (foodId) => {
    navigate(`/food/${foodId}`);
  };
  return (
    <>
      {FoodData.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        FoodData.foods.map((food) => (
          <FoodListing key={food.id} food={food} goToFood={goToFood} />
        ))
      )}
    </>
  );
};

export default FoodListings;

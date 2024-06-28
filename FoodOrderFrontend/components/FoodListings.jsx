import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../src/features/products/food/foodSlice";
import { useEffect } from "react";
import FoodListing from "./FoodListing";

const FoodListings = () => {
  const dispatch = useDispatch();
  const FoodData = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);
  return (
    <>
      <div className="row row-cols-1 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 g-4">
        {FoodData.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          FoodData.foods.map((food) => (
            <FoodListing food={food} key={food.id} />
          ))
        )}
      </div>
    </>
  );
};

export default FoodListings;

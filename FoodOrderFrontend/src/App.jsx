import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "./features/products/food/foodSlice";
import { fetchDrinks } from "./features/products/drink/drinkSlice";
import "./App.css";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const FoodData = useSelector((state) => state.foods);
  const drinkData = useSelector((state) => state.drinks);

  useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchDrinks());
  }, [dispatch]);

  return (
    <>
      {FoodData.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div>
            <h2>Foods</h2>
            {FoodData.foods.map((food) => (
              <p key={food.id}>{food.name}</p>
            ))}
          </div>
          <div>
            <h2>Drinks</h2>
            {drinkData.drinks.map((drink) => (
              <p key={drink.id}>{drink.name}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

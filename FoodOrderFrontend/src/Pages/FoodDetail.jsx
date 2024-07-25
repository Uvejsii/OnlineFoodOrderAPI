import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClickedFood } from "../features/products/food/foodSlice";
import { useParams } from "react-router-dom";
import GoToAdminPageButton from "../components/GoToAdminPageButton";
import GoToHomePageButton from "../components/GoToHomePageButton";

const FoodDetail = () => {
  const dispatch = useDispatch();
  const food = useSelector((state) => state.foods.clickedFood);
  const isLoading = useSelector((state) => state.foods.isLoading);
  const error = useSelector((state) => state.foods.error);
  const { foodId } = useParams();

  useEffect(() => {
    dispatch(getClickedFood(foodId));
  }, [foodId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching food please refresh the page</p>;
  }

  if (!food || !food.price) {
    return <p>Food not found or missing data</p>;
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="food-detail-wrapper">
          <div className="navigate-btns d-flex gap-5">
            <GoToAdminPageButton />
            <GoToHomePageButton />
          </div>
          <div className="food-detail-container border">
            <img src={food.imageUrl} alt={`${food.imageUrl} image`} />
            <h5>Rating: {food.rating}</h5>
            <h1>{food.name}</h1>
            <h5>{food.description}</h5>
            <h5>Price: € {food.price.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetail;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClickedFood } from "../src/features/products/food/foodSlice";

import { useParams } from "react-router-dom";
import GoToAdminPageButton from "../components/GoToAdminPageButton";

const FoodDetail = () => {
  const dispatch = useDispatch();
  const food = useSelector((state) => state.foods.clickedFood);
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    dispatch(getClickedFood(id));
  }, [id]);

  return (
    <div className="container border">
      <GoToAdminPageButton />
      <img src={food.imageUrl} alt="" />
      <h5>Rating: {food.rating}</h5>
      <h1>{food.name}</h1>
      <h5>{food.description}</h5>
      <h5>Price: {food.price}$</h5>
    </div>
  );
};

export default FoodDetail;

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteFoodButton from "./DeleteFoodButton";
import EditFoodButton from "./EditFoodButton";
// import { getClickedFood } from "../src/features/products/food/foodSlice";

const FoodListing = ({ food, goToFood }) => {
  // const [selectedFood, setSelectedFood] = useState(food);
  const navigate = useNavigate();

  // const handleEditClick = (foodToEdit) => {
  //   setSelectedFood(foodToEdit);
  // };
  // const dispatch = useDispatch();

  const onGoToFood = (foodId) => {
    goToFood(foodId);
  };

  return (
    <>
      <div className="col">
        <div className="card food-card">
          <img
            src={food.imageUrl}
            alt={`${food.name} image`}
            className="card-img-top img-fluid"
            onClick={() => {
              onGoToFood(food.id);
            }}
          />
          <div className="card-body">
            <h5
              onClick={() => {
                onGoToFood(food.id);
              }}
            >
              {food.name}
            </h5>
          </div>
          <div className="card-footer d-flex justify-content-between gap-3">
            <DeleteFoodButton food={food} />
            <EditFoodButton food={food} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodListing;

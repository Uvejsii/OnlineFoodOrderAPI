import DeleteFoodButton from "./DeleteFoodButton";
import EditFoodButton from "./EditFoodButton";

const FoodListing = ({ food, goToFood }) => {
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

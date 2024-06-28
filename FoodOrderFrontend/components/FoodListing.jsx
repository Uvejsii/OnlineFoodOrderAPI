import DeleteFoodButton from "./DeleteFoodButton";
import EditFoodButton from "./EditFoodButton";

const FoodListing = ({ food }) => {
  // const [selectedFood, setSelectedFood] = useState(food);

  // const handleEditClick = (foodToEdit) => {
  //   setSelectedFood(foodToEdit);
  // };

  return (
    <>
      <div className="col">
        <div className="card">
          <img
            src={food.imageUrl}
            alt={`${food.name} image`}
            className="card-img-top img-fluid"
          />
          <div className="card-body">
            <h5>{food.name}</h5>
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

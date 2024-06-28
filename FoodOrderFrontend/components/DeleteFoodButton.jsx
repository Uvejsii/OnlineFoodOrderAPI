import { useDispatch } from "react-redux";
import { deleteFood } from "../src/features/products/food/foodSlice";

const DeleteFoodButton = ({ food }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFood(food));
  };

  return (
    <button className="btn btn-danger fw-bold w-50" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteFoodButton;

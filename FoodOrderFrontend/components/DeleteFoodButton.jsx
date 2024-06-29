import { useDispatch } from "react-redux";
import { deleteFood } from "../src/features/products/food/foodSlice";
import { Trash3Fill } from "react-bootstrap-icons";

const DeleteFoodButton = ({ food }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFood(food));
  };

  return (
    <button
      className="btn btn-danger fw-bold w-50 d-flex align-items-center justify-content-center gap-1"
      onClick={handleDelete}
    >
      Delete <Trash3Fill />
    </button>
  );
};

export default DeleteFoodButton;

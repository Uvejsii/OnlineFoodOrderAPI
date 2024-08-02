import { useDispatch } from "react-redux";
import { deleteFood } from "../features/products/food/foodSlice";

const DeleteFoodButton = ({ food }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFood(food));
  };

  return (
    <button
      className="btn btn-danger fw-bold w-50 d-flex align-items-center justify-content-center gap-1"
      onClick={handleDelete}
      data-bs-dismiss="modal"
    >
      Confirm Delete
    </button>
  );
};

export default DeleteFoodButton;

import { useDispatch } from "react-redux";
import { setEditFoodData } from "../src/features/products/food/foodSlice";

const EditFoodButton = ({ food }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setEditFoodData(food));
  };

  return (
    <>
      <button
        className="btn btn-warning fw-bold w-50"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        onClick={handleClick}
      >
        Edit
      </button>
    </>
  );
};

export default EditFoodButton;

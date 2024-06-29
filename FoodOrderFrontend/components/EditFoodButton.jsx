import { useDispatch } from "react-redux";
import { setEditFoodData } from "../src/features/products/food/foodSlice";
import { PencilSquare } from "react-bootstrap-icons";

const EditFoodButton = ({ food }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setEditFoodData(food));
  };

  return (
    <>
      <button
        className="btn btn-warning fw-bold w-50 d-flex align-items-center justify-content-center gap-1"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        onClick={handleClick}
      >
        Edit <PencilSquare />
      </button>
    </>
  );
};

export default EditFoodButton;

import { useDispatch } from "react-redux";
import { setEditDrinkData } from "../src/features/products/drink/drinkSlice";
import { PencilSquare } from "react-bootstrap-icons";

const EditDrinkButton = ({ drink }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setEditDrinkData(drink));
  };
  return (
    <button
      className="btn btn-warning fw-bold w-50 d-flex align-items-center justify-content-center gap-1"
      data-bs-toggle="modal"
      data-bs-target="#editDrinkModal"
      onClick={handleClick}
    >
      Edit <PencilSquare />
    </button>
  );
};

export default EditDrinkButton;

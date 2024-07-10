import { Trash3Fill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { deleteDrink } from "../features/products/drink/drinkSlice";

const DeleteDrinkButton = ({ drink }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteDrink(drink));
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

export default DeleteDrinkButton;

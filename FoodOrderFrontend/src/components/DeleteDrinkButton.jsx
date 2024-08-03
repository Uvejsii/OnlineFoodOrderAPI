import { useDispatch } from "react-redux";
import { deleteDrink } from "../features/products/drink/drinkSlice";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteDrinkButton = ({ drink }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteDrink(drink));

    toast.success("Drink Deleted!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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

export default DeleteDrinkButton;

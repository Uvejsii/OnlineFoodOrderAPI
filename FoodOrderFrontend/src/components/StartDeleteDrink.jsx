import React from "react";
import { useDispatch } from "react-redux";
import { setDrinkToDelete } from "../features/products/drink/drinkSlice";
import { Trash3Fill } from "react-bootstrap-icons";

const StartDeleteDrink = ({ drink }) => {
  const dispatch = useDispatch();
  const handleDelete = (drinkToDelete) => {
    dispatch(setDrinkToDelete(drinkToDelete));
  };

  return (
    <button
      data-bs-toggle="modal"
      data-bs-target="#deleteDrinkModal"
      className="btn btn-danger fw-semibold d-flex justify-content-center align-items-center gap-1"
      onClick={() => handleDelete(drink)}
    >
      Delete <Trash3Fill />
    </button>
  );
};

export default StartDeleteDrink;

import React from "react";
import { useDispatch } from "react-redux";
import { setFoodToDelete } from "../features/products/food/foodSlice";
import { Trash3Fill } from "react-bootstrap-icons";

const StartDeleteFood = ({ food }) => {
  const dispatch = useDispatch();
  const handleDelete = (foodToDelete) => {
    dispatch(setFoodToDelete(foodToDelete));
  };

  return (
    <button
      data-bs-toggle="modal"
      data-bs-target="#deleteFoodModal"
      className="btn btn-danger fw-semibold d-flex justify-content-center align-items-center gap-1"
      onClick={() => handleDelete(food)}
    >
      Delete <Trash3Fill />
    </button>
  );
};

export default StartDeleteFood;

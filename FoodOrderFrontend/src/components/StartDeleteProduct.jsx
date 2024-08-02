import React from "react";
import { useDispatch } from "react-redux";
import { setFoodToDelete } from "../features/products/food/foodSlice";
import { Trash3Fill } from "react-bootstrap-icons";

const StartDeleteProduct = ({ product }) => {
  const dispatch = useDispatch();
  const handleDelete = (productToDelete) => {
    dispatch(setFoodToDelete(productToDelete));
  };

  return (
    <button
      data-bs-toggle="modal"
      data-bs-target="#deleteFoodModal"
      className="btn btn-danger fw-semibold d-flex justify-content-center align-items-center gap-1"
      onClick={() => handleDelete(product)}
    >
      Delete <Trash3Fill />
    </button>
  );
};

export default StartDeleteProduct;

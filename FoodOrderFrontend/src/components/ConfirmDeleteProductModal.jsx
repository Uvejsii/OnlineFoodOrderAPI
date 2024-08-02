import { useDispatch, useSelector } from "react-redux";
import { deleteFood } from "../features/products/food/foodSlice";
import DeleteFoodButton from "./DeleteFoodButton";

const ConfirmDeleteProductModal = () => {
  const dispatch = useDispatch();
  const foodToDelete = useSelector((state) => state.foods.foodToDelete);

  const handleDeleteProduct = (clickedFood) => {
    dispatch(deleteFood(clickedFood));
  };

  return (
    <div
      className="modal fade"
      id="deleteFoodModal"
      aria-labelledby="deleteFoodModal"
      tabIndex="-5"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-danger-subtle text-danger fw-semibold border-danger">
          <div className="modal-header border-danger">
            <h5 className="modal-title fw-semibold">Delete Product</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure that you want to delete {foodToDelete.name}?</p>
          </div>
          <div className="modal-footer border-danger">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <DeleteFoodButton food={foodToDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteProductModal;

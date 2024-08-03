import { useSelector } from "react-redux";
import DeleteDrinkButton from "./DeleteDrinkButton";

const ConfirmDeleteDrinkModal = () => {
  const drinkToDelete = useSelector((state) => state.drinks.drinkToDelete);
  return (
    <div
      className="modal fade"
      id="deleteDrinkModal"
      aria-labelledby="deleteDrinkModal"
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
            <p>Are you sure that you want to delete {drinkToDelete.name}?</p>
          </div>
          <div className="modal-footer border-danger">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <DeleteDrinkButton drink={drinkToDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDrinkModal;

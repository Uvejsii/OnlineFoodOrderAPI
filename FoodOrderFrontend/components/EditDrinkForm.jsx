import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  editDrink,
  fetchDrinks,
} from "../src/features/products/drink/drinkSlice";

const EditDrinkForm = () => {
  const dispatch = useDispatch();
  const editDrinkData = useSelector((state) => state.drinks.editDrinkData);
  const [formData, setFormData] = useState(editDrinkData || {});

  useEffect(() => {
    setFormData(editDrinkData);
  }, [editDrinkData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDrink(formData));
    dispatch(fetchDrinks());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="editDrinkModal"
        tabIndex="-4"
        aria-labelledby="editDrinkModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="col-12 text-warning fw-bold form-container border border-warning rounded-3 bg-warning-subtle p-4">
              <h2 className="text-center fw-bold">Edit Drink</h2>
              <div className="inputs-container mb-3">
                <p className="m-0">Image Url</p>
                <input
                  type="text"
                  name="imageUrl"
                  className="w-100"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Name</p>
                <input
                  type="text"
                  name="name"
                  className="w-100"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container my-3">
                <p className="m-0">Description</p>
                <input
                  type="text"
                  name="description"
                  className="w-100"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Price</p>
                <input
                  type="number"
                  name="price"
                  className="w-100"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container my-3">
                <p className="m-0">Rating</p>
                <input
                  type="number"
                  name="rating"
                  className="w-100"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Category</p>
                <input
                  type="text"
                  name="category"
                  className="w-100 mb-3"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Quantity</p>
                <input
                  type="number"
                  name="quantity"
                  className="w-100"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100 mt-4 fw-bold"
                data-bs-dismiss="modal"
              >
                CONFIRM EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditDrinkForm;

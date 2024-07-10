import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDrink } from "../features/products/drink/drinkSlice";

const AddDrinkForm = () => {
  const dispatch = useDispatch();
  const [newDrink, setNewDrink] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: 0,
    rating: 0,
    category: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDrink({
      ...newDrink,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDrink(newDrink));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addDrinkModal"
        tabIndex="-3"
        aria-labelledby="addDrinkModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="col-12 text-success fw-bold form-container border border-success rounded-3 bg-success-subtle p-4">
              <h2 className="text-center fw-bold">Add New Drink</h2>
              <div className="inputs-container mb-3">
                <p className="m-0">Image Url</p>
                <input
                  type="text"
                  name="imageUrl"
                  className="w-100"
                  value={newDrink.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Name</p>
                <input
                  type="text"
                  name="name"
                  className="w-100"
                  value={newDrink.name}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container my-3">
                <p className="m-0">Description</p>
                <input
                  type="text"
                  name="description"
                  className="w-100"
                  value={newDrink.description}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Price</p>
                <input
                  type="number"
                  name="price"
                  className="w-100"
                  value={newDrink.price}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container my-3">
                <p className="m-0">Rating</p>
                <input
                  type="number"
                  name="rating"
                  className="w-100"
                  value={newDrink.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Category</p>
                <input
                  type="text"
                  name="category"
                  className="w-100 mb-3"
                  value={newDrink.category}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Quantity</p>
                <input
                  type="number"
                  name="quantity"
                  className="w-100"
                  value={newDrink.quantity}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-success w-100 mt-4 fw-bold"
                data-bs-dismiss="modal"
              >
                CONFIRM ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDrinkForm;

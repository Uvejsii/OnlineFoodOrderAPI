import { useDispatch } from "react-redux";
import { addFood } from "../src/features/products/food/foodSlice";
import { useState } from "react";

const AddFoodForm = () => {
  const dispatch = useDispatch();
  const [newFood, setNewFood] = useState({
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
    setNewFood({
      ...newFood,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFood(newFood));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="col-12 text-primary fw-bold form-container border border-primary rounded-3 bg-primary-subtle p-4">
              <h2 className="text-center fw-bold">Add New Food</h2>
              <div className="inputs-container mb-3">
                <p className="m-0">Image Url</p>
                <input
                  type="text"
                  name="imageUrl"
                  className="w-100"
                  value={newFood.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Name</p>
                <input
                  type="text"
                  name="name"
                  className="w-100"
                  value={newFood.name}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container my-3">
                <p className="m-0">Description</p>
                <input
                  type="text"
                  name="description"
                  className="w-100"
                  value={newFood.description}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Price</p>
                <input
                  type="number"
                  name="price"
                  className="w-100"
                  value={newFood.price}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container my-3">
                <p className="m-0">Rating</p>
                <input
                  type="number"
                  name="rating"
                  className="w-100"
                  value={newFood.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Category</p>
                <input
                  type="text"
                  name="category"
                  className="w-100 mb-3"
                  value={newFood.category}
                  onChange={handleChange}
                />
              </div>
              <div className="inputs-container">
                <p className="m-0">Quantity</p>
                <input
                  type="number"
                  name="quantity"
                  className="w-100"
                  value={newFood.quantity}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-primary w-100 mt-4 fw-bold"
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

export default AddFoodForm;

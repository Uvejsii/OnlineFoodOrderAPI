import AddDrinkForm from "../components/AddDrinkForm";
import AddFoodForm from "../components/AddFoodForm";
import DrinkListings from "../components/DrinkListings";
import EditDrinkForm from "../components/EditDrinkForm";
import EditFoodForm from "../components/EditFoodForm";
import FoodListings from "../components/FoodListings";
import { PlusCircleFill } from "react-bootstrap-icons";

const AdminPage = () => {
  return (
    <div className="container">
      <h1 className="text-center">ADMIN PAGE</h1>
      <div className="add-btns-wrapper d-flex gap-5">
        <button
          className="btn btn-primary fw-bold mb-3 d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Food <PlusCircleFill />
        </button>
        <button
          className="btn btn-success fw-bold mb-3 d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#addDrinkModal"
        >
          Add Drink <PlusCircleFill />
        </button>
      </div>
      <AddFoodForm />
      <EditFoodForm />
      <AddDrinkForm />
      <EditDrinkForm />
      <div className="products-wrapper row row-cols-1 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 g-4">
        <FoodListings />
        <DrinkListings />
      </div>
    </div>
  );
};

export default AdminPage;

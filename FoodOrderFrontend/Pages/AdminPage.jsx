import AddFoodForm from "../components/AddFoodForm";
import EditFoodForm from "../components/EditFoodForm";
import FoodListings from "../components/FoodListings";
import { PlusCircleFill } from "react-bootstrap-icons";

const AdminPage = () => {
  return (
    <div className="container">
      <h1 className="text-center">ADMIN PAGE</h1>
      <button
        className="btn btn-primary fw-bold mb-3 d-flex align-items-center gap-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Food <PlusCircleFill />
      </button>
      <AddFoodForm />
      <EditFoodForm />
      <FoodListings />
    </div>
  );
};

export default AdminPage;

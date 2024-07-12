import AddDrinkForm from "../components/AddDrinkForm";
import AddFoodForm from "../components/AddFoodForm";
import DrinkListings from "../components/DrinkListings";
import EditDrinkForm from "../components/EditDrinkForm";
import EditFoodForm from "../components/EditFoodForm";
import FilterProducts from "../components/FilterProducts";
import FoodListings from "../components/FoodListings";
import { PlusCircleFill } from "react-bootstrap-icons";
import SearchProducts from "../components/SearchProducts";
import { useState } from "react";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [filteredProducts, setFilteredProducts] = useState({
    foods: [],
    drinks: [],
  });

  return (
    <AuthorizeView>
      <div className="container">
        <h1 className="text-center">ADMIN PAGE</h1>
        <h5 className="text-center">
          Welcome:{" "}
          <span className="text-decoration-underline text-primary">
            <AuthorizedUser value="email" />
          </span>
        </h5>
        <Link to="/cart">Cart</Link>
        <div className="d-flex justify-content-end mb-3">
          <LogOutButton />
        </div>
        <div className="admin-actions d-flex justify-content-between align-items-center">
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
          <SearchProducts setFilteredProducts={setFilteredProducts} />
          <FilterProducts />
        </div>
        <AddFoodForm />
        <EditFoodForm />
        <AddDrinkForm />
        <EditDrinkForm />
        <div className="products-wrapper row row-cols-1 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 g-4">
          <FoodListings foods={filteredProducts.foods} />
          <DrinkListings drinks={filteredProducts.drinks} />
        </div>
      </div>
    </AuthorizeView>
  );
};

export default AdminPage;

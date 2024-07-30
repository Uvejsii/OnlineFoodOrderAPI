import AddDrinkForm from "../components/AddDrinkForm";
import AddFoodForm from "../components/AddFoodForm";
import DrinkListings from "../components/DrinkListings";
import EditDrinkForm from "../components/EditDrinkForm";
import EditFoodForm from "../components/EditFoodForm";
import FilterProducts from "../components/FilterProducts";
import FoodListings from "../components/FoodListings";
import { Cart2, PlusCircleFill } from "react-bootstrap-icons";
import SearchProducts from "../components/SearchProducts";
import { useState, useEffect } from "react";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCartItems } from "../features/orders/ordersSlice";
import styled from "styled-components";
import "/src/admin.css";

const Container = styled.div`
  background-color: #f5f5f5;
  color: #333333;
  padding: 20px;
`;

const SubHeader = styled.h5`
  text-align: center;
  color: #333333;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#FFA500" : "#FF6347")};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.$primary ? "#FF8C00" : "#FF4500")};
  }
`;

const AdminPage = () => {
  const [filteredProducts, setFilteredProducts] = useState({
    foods: [],
    drinks: [],
  });

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.orders.cartItems) || [];
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const totalCartQty = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setCartQuantity(totalCartQty);
    }
  }, [cartItems]);

  return (
    <AuthorizeView>
      <Container>
        <SubHeader>
          Welcome:{" "}
          <span className="text-decoration-underline text-primary">
            <AuthorizedUser value="email" />
          </span>
        </SubHeader>
        <div className="d-flex justify-content-end mb-3">
          <LogOutButton />
        </div>
        <div className="admin-actions d-flex justify-content-between align-items-center mb-4">
          <div className="add-btns-wrapper d-flex gap-3">
            <Button
              $primary
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Food <PlusCircleFill />
            </Button>
            <Button data-bs-toggle="modal" data-bs-target="#addDrinkModal">
              Add Drink <PlusCircleFill />
            </Button>
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
      </Container>
    </AuthorizeView>
  );
};

export default AdminPage;

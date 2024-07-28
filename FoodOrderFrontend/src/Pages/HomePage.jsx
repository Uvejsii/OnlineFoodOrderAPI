import FoodListings from "../components/FoodListings";
import { useState } from "react";
import SearchProducts from "../components/SearchProducts";
import DrinkListings from "../components/DrinkListings";
import GoToAdminPageButton from "../components/GoToAdminPageButton";
import FilterProducts from "../components/FilterProducts";
import styled from "styled-components";

const HomeContainer = styled.div`
  background-color: #f5f5f5;
`;

const HomePage = () => {
  const [filteredProducts, setFilteredProducts] = useState({
    foods: [],
    drinks: [],
  });
  const homePage = true;

  return (
    <HomeContainer>
      <div className="container">
        <h1 className="text-center">Home Page</h1>
        <div className="d-flex justify-content-between">
          <GoToAdminPageButton />
          <SearchProducts setFilteredProducts={setFilteredProducts} />
          <FilterProducts />
        </div>
        <div className="products-wrapper row row-cols-1 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 g-4">
          <FoodListings foods={filteredProducts.foods} isHomePage={homePage} />
          <DrinkListings
            drinks={filteredProducts.drinks}
            isHomePage={homePage}
          />
        </div>
      </div>
    </HomeContainer>
  );
};

export default HomePage;

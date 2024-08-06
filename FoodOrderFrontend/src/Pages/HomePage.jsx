import { useState } from "react";
import FoodListings from "../components/FoodListings";
import SearchProducts from "../components/SearchProducts";
import DrinkListings from "../components/DrinkListings";
import GoToAdminPageButton from "../components/GoToAdminPageButton";
import FilterProducts from "../components/FilterProducts";
import styled from "styled-components";
import AuthorizeView from "../components/AuthorizeView";

const HomeContainer = styled.div`
  background-color: #f5f5f5;
  padding-top: 50px;
`;

const HomePage = () => {
  const [filteredProducts, setFilteredProducts] = useState({
    foods: [],
    drinks: [],
  });
  const homePage = true;

  return (
    <AuthorizeView>
      <HomeContainer>
        <div className="container">
          <div className="d-flex justify-content-between">
            <GoToAdminPageButton />
            <SearchProducts setFilteredProducts={setFilteredProducts} />
            <FilterProducts />
          </div>
          <div className="products-wrapper row row-cols-1 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 g-4 py-5">
            <FoodListings
              foods={filteredProducts.foods}
              isHomePage={homePage}
            />
            <DrinkListings
              drinks={filteredProducts.drinks}
              isHomePage={homePage}
            />
          </div>
        </div>
      </HomeContainer>
    </AuthorizeView>
  );
};

export default HomePage;

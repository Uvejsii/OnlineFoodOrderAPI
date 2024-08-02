import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Input = styled.input`
  box-shadow: 0 0 12px -4px rgba(125, 125, 125, 1);
  padding: 2.5px 0;
  padding-left: 40px !important;
  font-size: 17px;
  border: 2px solid #ff6536;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #ff6536 !important;
  }
`;

const Button = styled.button`
  background-color: #ff6536;
  color: white;
`;

const SearchProducts = ({ setFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const foodData = useSelector((state) => state.foods);
  const drinkData = useSelector((state) => state.drinks);

  const onSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts({
        foods: foodData.foods,
        drinks: drinkData.drinks,
      });
    } else {
      const filteredFoods = foodData.foods.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
      const filteredDrinks = drinkData.drinks.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredProducts({
        foods: filteredFoods,
        drinks: filteredDrinks,
      });
    }
  }, [searchQuery, foodData.foods, drinkData.drinks, setFilteredProducts]);

  return (
    <div className="search-container mb-3 d-flex align-items-center gap-2">
      <Button className="position-absolute rounded-3 py-1 px-2 border-0">
        <Search />
      </Button>
      <Input
        type="text"
        placeholder="Search a product..."
        className="ps-2 rounded-3"
        value={searchQuery}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchProducts;

import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

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
      <input
        type="text"
        placeholder="Search a product..."
        className="ps-2 rounded border-1"
        value={searchQuery}
        onChange={onSearch}
      />
      <button className="btn btn-outline-primary d-flex align-items-center justify-content-center">
        <Search />
      </button>
    </div>
  );
};

export default SearchProducts;

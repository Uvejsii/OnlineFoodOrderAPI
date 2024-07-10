import { useDispatch } from "react-redux";
import { setFilter } from "../features/products/filter/filterSlice";

const FilterProducts = () => {
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    const filterTo = e.target.value;
    dispatch(setFilter(filterTo));
  };

  return (
    <select className="p-1 mb-3 rounded fw-medium" onChange={onFilterChange}>
      <option value="Filter All">Filter All</option>
      <option value="Food">Food Products</option>
      <option value="Drink">Drink Products</option>
    </select>
  );
};

export default FilterProducts;

import { useDispatch } from "react-redux";
import { setFilter } from "../features/products/filter/filterSlice";
import styled from "styled-components";

const Select = styled.select`
  border: none;
  background-color: #ff6536;
  color: white;
  &:focus {
    outline: none;
  }
`;

const FilterProducts = () => {
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    const filterTo = e.target.value;
    dispatch(setFilter(filterTo));
  };

  return (
    <Select
      className="p-2 mb-3 rounded fw-medium shadow-sm d-flex flex-column gap-4"
      onChange={onFilterChange}
    >
      <option value="Filter All">Filter All</option>
      <option value="Food">Food Products</option>
      <option value="Drink">Drink Products</option>
    </Select>
  );
};

export default FilterProducts;

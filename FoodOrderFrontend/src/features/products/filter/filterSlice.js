import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFilter: "Filter All",
  filteredProducts: {
    foods: [],
    drinks: [],
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

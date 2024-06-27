import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDrinks = createAsyncThunk("fetchDrinks", async () => {
  const data = await fetch("http://localhost:5071/getAllDrinkProducts");
  return data.json();
});

const initialState = {
  drinks: [],
  isLoading: null,
  error: false,
};

export const drinkSlice = createSlice({
  name: "drink",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDrinks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDrinks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.drinks = action.payload;
    });
    builder.addCase(fetchDrinks.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default drinkSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFoods = createAsyncThunk("fetchFoods", async () => {
  const data = await fetch("http://localhost:5071/getAllFoodProducts");
  return data.json();
});

const initialState = {
  foods: [],
  isLoading: null,
  error: false,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoods.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
    });
    builder.addCase(fetchFoods.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default foodSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFoods = createAsyncThunk("fetchFoods", async () => {
  const data = await fetch("http://localhost:5071/getAllFoodProducts");
  return data.json();
});

export const addFood = createAsyncThunk("addFood", async (newFood) => {
  const response = await fetch("http://localhost:5071/postFood", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFood),
  });
  return response.json();
});

export const editFood = createAsyncThunk("editFood", async (foodToEdit) => {
  const response = await fetch(
    `http://localhost:5071/editFood/${foodToEdit.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodToEdit),
    }
  );
  return response.json();
});

export const deleteFood = createAsyncThunk(
  "deleteFood",
  async (foodToDelete) => {
    const response = await fetch(
      `http://localhost:5071/deleteFood/${foodToDelete.id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }
);

const initialState = {
  foods: [],
  isLoading: null,
  error: false,
  selectedFoodId: null,
  editFoodData: {
    imageUrl: "",
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    quantity: "",
  },
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setEditFoodData: (state, action) => {
      state.editFoodData = action.payload;
      state.selectedFoodId = action.payload.id;
      console.log(state.selectedFoodId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFoods.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
    });
    builder.addCase(fetchFoods.rejected, (state) => {
      state.error = true;
    });

    // ADD FOOD
    builder.addCase(addFood.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFood.fulfilled, (state, action) => {
      state.isLoading = false;
      state.foods.push(action.payload);
    });
    builder.addCase(addFood.rejected, (state) => {
      state.error = true;
    });

    // EDIT FOOD
    builder.addCase(editFood.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editFood.fulfilled, (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
      // const index = state.foods.findIndex((f) => f.id === action.payload.id);
      // if (index !== -1) {
      //   state.foods[index] = action.payload;
      // }
    });
    builder.addCase(editFood.rejected, (state) => {
      state.error = true;
    });

    // DELETE FOOD
    builder.addCase(deleteFood.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFood.fulfilled, (state, action) => {
      state.isLoading = false;
      state.foods = action.payload;
    });
    builder.addCase(deleteFood.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { setEditFoodData } = foodSlice.actions;
export default foodSlice.reducer;

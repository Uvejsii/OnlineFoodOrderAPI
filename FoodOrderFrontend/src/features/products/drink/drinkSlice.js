import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDrinks = createAsyncThunk("fetchDrinks", async () => {
  const data = await fetch("http://localhost:5071/getAllDrinkProducts");
  return data.json();
});

export const addDrink = createAsyncThunk("addDrink", async (newDrink) => {
  const response = await fetch("http://localhost:5071/postDrink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newDrink),
  });
  return response.json();
});

export const editDrink = createAsyncThunk("editDrink", async (drinkToEdit) => {
  const response = await fetch(
    `http://localhost:5071/editDrink/${drinkToEdit.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(drinkToEdit),
    }
  );
  return response.json();
});

export const deleteDrink = createAsyncThunk(
  "deleteDrink",
  async (drinkToDelete) => {
    const response = await fetch(
      `http://localhost:5071/deleteDrink/${drinkToDelete.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    return response.json();
  }
);

export const getClickedDrink = createAsyncThunk(
  "getClickedDrink",
  async (drinkId) => {
    const data = await fetch(`http://localhost:5071/drink/${drinkId}`);
    return data.json();
  }
);

const initialState = {
  drinks: [],
  clickedDrink: {},
  isLoading: null,
  error: false,
  editDrinkData: {
    imageUrl: "",
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    quantity: "",
  },
  drinkToDelete: {},
};

export const drinkSlice = createSlice({
  name: "drink",
  initialState,
  reducers: {
    setEditDrinkData: (state, action) => {
      state.editDrinkData = action.payload;
    },
    setDrinkToDelete: (state, action) => {
      state.drinkToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrinks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDrinks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.drinks = action.payload;
    });
    builder.addCase(fetchDrinks.rejected, (state) => {
      state.error = true;
    });

    // ADD DRINK
    builder.addCase(addDrink.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addDrink.fulfilled, (state, action) => {
      state.isLoading = false;
      state.drinks = action.payload;
    });
    builder.addCase(addDrink.rejected, (state) => {
      state.error = true;
    });

    // EDIT DRINK
    builder.addCase(editDrink.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editDrink.fulfilled, (state, action) => {
      state.isLoading = false;
      state.drinks = action.payload;
    });
    builder.addCase(editDrink.rejected, (state) => {
      state.error = true;
    });

    // DELETE DRINK
    builder.addCase(deleteDrink.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDrink.fulfilled, (state, action) => {
      state.isLoading = false;
      state.drinks = action.payload;
    });
    builder.addCase(deleteDrink.rejected, (state) => {
      state.error = true;
    });

    // GET CLICKED DRINK
    builder.addCase(getClickedDrink.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClickedDrink.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clickedDrink = action.payload;
    });
    builder.addCase(getClickedDrink.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { setEditDrinkData, setDrinkToDelete } = drinkSlice.actions;
export default drinkSlice.reducer;

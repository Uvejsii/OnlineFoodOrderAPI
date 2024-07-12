import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("addToCart", async (cartItem) => {
  const response = await fetch("http://localhost:5071/addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItem),
    credentials: "include",
  });
  return response.json();
});

export const fetchAllCartItems = createAsyncThunk(
  "fetchAllCartItems",
  async () => {
    const response = await fetch("http://localhost:5071/getAllAddedItems", {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async ({ productId, productType }) => {
    const response = await fetch(
      `http://localhost:5071/removeCartItem/${productId}/${productType}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    return response.json();
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "updateCartItemQuantity",
  async ({ productId, change, productType }) => {
    const response = await fetch(
      `http://localhost:5071/updateCartItemQuantity/${productId}/${change}/${productType}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    return response.json();
  }
);

const initialState = {
  cartItems: [],
  isLoading: null,
  error: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.error = true;
    });

    // FETCH CART ITEMS
    builder.addCase(fetchAllCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCartItems.fulfilled, (state, acton) => {
      state.isLoading = false;
      state.cartItems = acton.payload;
    });
    builder.addCase(fetchAllCartItems.rejected, (state) => {
      state.error = true;
    });

    // REMOVE FROM CART
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(removeFromCart.rejected, (state) => {
      state.error = true;
    });

    // UPDATE CARTI ITEM QUANTITY
    builder.addCase(updateCartItemQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(updateCartItemQuantity.rejected, (state) => {
      state.error = true;
    });
  },
});

export default ordersSlice.reducer;

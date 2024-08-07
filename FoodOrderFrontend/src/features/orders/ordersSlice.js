import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5071/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllCartItems = createAsyncThunk(
  "fetchAllCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5071/getAllAddedItems", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue("NotFound");
        } else if (response.status === 401) {
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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

export const getOrderTotal = createAsyncThunk(
  "getOrderTotal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5071/getOrderTotal", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue("NotFound");
        } else if (response.status === 401) {
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "createOrder",
  async (orderDetails) => {
    const queryString = new URLSearchParams(orderDetails).toString();
    const response = await fetch(
      `http://localhost:5071/createOrder?${queryString}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderDetails),
      }
    );
    return response.json();
  }
);

export const getOrders = createAsyncThunk("getOrders", async () => {
  const response = await fetch("http://localhost:5071/getOrdersForAdmin", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
});

export const getLastOrder = createAsyncThunk(
  "getLastOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5071/getLastOrder", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue("NotFound");
        } else if (response.status === 401) {
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editOrderStatus = createAsyncThunk(
  "editOrderStatus",
  async ({ orderId, newStatus }) => {
    const response = await fetch(
      `http://localhost:5071/editOrderStatus/${orderId}/${newStatus}`,
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
  placedOrders: [],
  adminOrders: [],
  lastOrder: {},
  subTotal: 0,
  orderTotal: 0,
  isLoading: null,
  error: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // FETCH CART ITEMS
    builder.addCase(fetchAllCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCartItems.fulfilled, (state, acton) => {
      state.isLoading = false;
      state.cartItems = acton.payload;
    });
    builder.addCase(fetchAllCartItems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      if (action.payload === "Unauthorized") {
        state.error = "Unauthorized";
      } else if (action.payload === "NotFound") {
        state.error = "NotFound";
      } else {
        state.error = action.payload;
      }
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

    // UPDATE CART ITEM QUANTITY
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

    // GET ORDER TOTAL
    builder.addCase(getOrderTotal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderTotal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subTotal = action.payload.orderTotal - 1;
      state.orderTotal = action.payload.orderTotal;
      if (state.subTotal == 0) {
        state.orderTotal = 0;
      }
    });
    builder.addCase(getOrderTotal.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // PLACE ORDER
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = 0;
      state.orderTotal = 0;
      state.placedOrders = state.placedOrders || [];
      state.placedOrders = action.payload;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.error = true;
    });

    // GET ORDERS
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.error = true;
    });

    // GET LAST ORDER
    builder.addCase(getLastOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLastOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastOrder = action.payload;
    });
    builder.addCase(getLastOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      if (action.payload === "Unathorized") {
        state.error = "Unathorized";
      } else if (action.payload === "NotFound") {
        state.error = "NotFound";
      } else {
        state.error = action.payload;
      }
    });

    // EDIT ORDER STATUS
    builder.addCase(editOrderStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    });
    builder.addCase(editOrderStatus.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { clearCart } = ordersSlice.actions;
export default ordersSlice.reducer;

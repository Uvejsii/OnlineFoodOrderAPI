import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "../orders/ordersSlice";

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5071/customLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "userLogout",
  async (_, { dispatch }) => {
    await fetch("http://localhost:5071/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch(clearCart());
  }
);

const initialState = {
  user: loadUserFromLocalStorage(),
  status: "idle",
  authorized: !!loadUserFromLocalStorage(),
  loading: false,
  error: null,
  isAdminOn: loadUserFromLocalStorage()
    ? loadUserFromLocalStorage().roles.includes("Admin")
    : false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.authorized = true;
      saveUserToLocalStorage(action.payload);
    },
    setAuthorized(state, action) {
      state.authorized = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        if (action.payload.roles.includes("Admin")) {
          state.isAdminOn = true;
        }
        saveUserToLocalStorage(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = null;
      state.authorized = false;
      state.status = "idle";
      state.isAdminOn = false;
      localStorage.removeItem("user");
    });
  },
});

export const { setUser, setAuthorized, setLoading } = usersSlice.actions;
export default usersSlice.reducer;

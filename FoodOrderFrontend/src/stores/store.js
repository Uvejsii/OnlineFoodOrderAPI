import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../stores/reducers";

export const store = configureStore({
  reducer: rootReducer,
});

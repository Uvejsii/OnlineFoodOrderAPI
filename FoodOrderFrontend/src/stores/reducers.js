import { combineReducers } from "redux";
import foodReducer from "../features/products/food/foodSlice";
import drinkReducer from "../features/products/drink/drinkSlice";
import filterReducer from "../features/products/filter/filterSlice";
import orderReducer from "../features/orders/ordersSlice";

const rootReducer = combineReducers({
  foods: foodReducer,
  drinks: drinkReducer,
  filter: filterReducer,
  orders: orderReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import foodReducer from "../features/products/food/foodSlice";
import drinkReducer from "../features/products/drink/drinkSlice";
import filterReducer from "../features/products/filter/filterSlice";
import orderReducer from "../features/orders/ordersSlice";
import userReducer from "../features/users/usersSlice";

const rootReducer = combineReducers({
  foods: foodReducer,
  drinks: drinkReducer,
  filter: filterReducer,
  orders: orderReducer,
  users: userReducer,
});

export default rootReducer;

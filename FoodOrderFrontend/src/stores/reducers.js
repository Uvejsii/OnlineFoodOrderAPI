import { combineReducers } from "redux";
import foodReducer from "../features/products/food/foodSlice";
import drinkReducer from "../features/products/drink/drinkSlice";
import filterReducer from "../features/products/filter/filterSlice";

const rootReducer = combineReducers({
  foods: foodReducer,
  drinks: drinkReducer,
  filter: filterReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import foodReducer from "../features/products/food/foodSlice";
import drinkReducer from "../features/products/drink/drinkSlice";

const rootReducer = combineReducers({
  foods: foodReducer,
  drinks: drinkReducer,
});

export default rootReducer;

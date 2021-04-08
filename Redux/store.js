import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// Import Reducers
import cartItems from "./Reducers/cartItem";

// Combine Reducers
const reducer = combineReducers({
  cartItems: cartItems,
});

// Store
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export default store;

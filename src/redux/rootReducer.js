// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
// import other reducers as needed
import cartReducer from "../slices/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  // add other slices or reducers here
});

export default rootReducer;

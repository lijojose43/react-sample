// store.js
import { createStore } from "redux";

const initialState = {
  isLoggedIn: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return { isLoggedIn: true };
    case "LOG_OUT":
      return { isLoggedIn: false };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;

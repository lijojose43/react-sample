"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

// store.js
var initialState = {
  isLoggedIn: false
};

function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "LOG_IN":
      return {
        isLoggedIn: true
      };

    case "LOG_OUT":
      return {
        isLoggedIn: false
      };

    default:
      return state;
  }
}

var store = (0, _redux.createStore)(rootReducer);
var _default = store;
exports["default"] = _default;
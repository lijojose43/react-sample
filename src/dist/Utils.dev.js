"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEmailChange = exports.addNumbers = void 0;

// utils.js
var addNumbers = function addNumbers(a, b) {
  return a + b;
};

exports.addNumbers = addNumbers;

var handleEmailChange = function handleEmailChange(event) {
  var value = event.target.value;
  setEmail(value);

  if (!value) {
    setEmailError("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError("Invalid email");
  } else {
    setEmailError("");
  }
};

exports.handleEmailChange = handleEmailChange;
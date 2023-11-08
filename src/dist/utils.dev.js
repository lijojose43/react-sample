"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOut = exports.isLoggedIn = exports.makeApiCall = exports.handleEmailChange = void 0;

// utils.js
var handleEmailChange = function handleEmailChange(event, setEmail, setEmailError) {
  var email = event.target.value;
  setEmail(email);

  if (!email) {
    setEmailError("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError("Invalid email");
  } else {
    setEmailError("");
  }
};

exports.handleEmailChange = handleEmailChange;

var makeApiCall = function makeApiCall(endpoint) {
  var method,
      data,
      url,
      requestOptions,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function makeApiCall$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _args.length > 1 && _args[1] !== undefined ? _args[1] : "GET";
          data = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          url = "".concat(process.env.REACT_APP_API_URL).concat(endpoint);
          _context.prev = 3;
          requestOptions = {
            method: method,
            headers: {
              "Content-Type": "application/json"
            }
          };

          if (method !== "GET") {
            // Only include a body when the method is not GET
            requestOptions.body = JSON.stringify(data);
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(fetch(url, requestOptions));

        case 8:
          response = _context.sent;

          if (response.ok) {
            _context.next = 11;
            break;
          }

          throw new Error("Network response was not ok");

        case 11:
          return _context.abrupt("return", response.json());

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          // Handle error scenarios here
          console.error("Error fetching data:", _context.t0);
          return _context.abrupt("return", null);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
};

exports.makeApiCall = makeApiCall;

var isLoggedIn = function isLoggedIn() {
  setTimeout(function () {
    var storedData = localStorage.getItem("credentials");

    if (storedData) {
      var credentials = JSON.parse(storedData);

      if (credentials.token) {
        return true;
      } else {
        return false;
      }
    }
  }, 4000); // 2000 milliseconds = 2 seconds
};

exports.isLoggedIn = isLoggedIn;

var logOut = function logOut() {
  localStorage.removeItem("credentials");
};

exports.logOut = logOut;
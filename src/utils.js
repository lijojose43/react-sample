// utils.js

export const handleEmailChange = (event, setEmail, setEmailError) => {
  const email = event.target.value;
  setEmail(email);
  if (!email) {
    setEmailError("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError("Invalid email");
  } else {
    setEmailError("");
  }
};

// Common API call function
export const makeApiCall = (endpoint, method = "GET", data = null) => {
  const url = `${process.env.REACT_APP_API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

export const isLoggedIn = () => {
  const storedData = localStorage.getItem("credentials");
  if (storedData) {
    const credentials = JSON.parse(storedData);
    if (credentials.token) {
      return true;
    } else {
      return false;
    }
  }
};

// utils.js
export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return `${str.substring(0, maxLength)}...`;
  }
};

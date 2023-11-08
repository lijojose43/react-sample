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

export const makeApiCall = async (endpoint, method = "GET", data = null) => {
  const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
  try {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET") {
      // Only include a body when the method is not GET
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    // Handle error scenarios here
    console.error("Error fetching data:", error);
    return null;
  }
};

export const isLoggedIn = () => {
  setTimeout(() => {
    const storedData = localStorage.getItem("credentials");
    if (storedData) {
      const credentials = JSON.parse(storedData);
      if (credentials.token) {
        return true;
      } else {
        return false;
      }
    }
  }, 4000); // 2000 milliseconds = 2 seconds
};

export const logOut = () => {
  localStorage.removeItem("credentials");
};

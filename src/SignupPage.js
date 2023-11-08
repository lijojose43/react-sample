import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideImageBlock from "./SideImageBlock";
import Terms from "./Terms";

function LoginPage({ isDarkMode }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSignup = async () => {
    if (!name) {
      setNameError("Name is required");
    }

    if (!username) {
      setPasswordError("Username is required");
    } else {
      setPasswordError("");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    if (password !== password_confirmation) {
      setPasswordConfirmError("Password mismatch!");
    } else {
      setPasswordConfirmError("");
    }

    if (username !== "" && password !== null) {
      try {
        const response = await fetch("http://localhost:8000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, password }),
        });
      } catch (error) {
        setErrorMessage("An error occurred while logging in");
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="col-md-12 mt-5">
        <div className="row">
          <SideImageBlock image="/register.svg"></SideImageBlock>
          <div className="col-md-5">
            <h3 className="text-center mb-3">Create an account</h3>
            <div>
              Already have an account? <Link to="/login">Login</Link>
            </div>
            <div className="p-3 mb-5 rounded" style={{ margin: "0 auto" }}>
              <div className="card-body">
                {errorMessage && (
                  <p className="text-danger mb-3">{errorMessage}</p>
                )}
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className={
                      isDarkMode
                        ? `form-control ${
                            nameError && "is-invalid"
                          } bg-dark text-white`
                        : `form-control ${nameError && "is-invalid"}`
                    }
                    placeholder="Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  {nameError && (
                    <div className="invalid-feedback text-start">
                      {nameError}
                    </div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="username"
                    autoComplete="off"
                    className={
                      isDarkMode
                        ? `form-control ${
                            usernameError && "is-invalid"
                          } bg-dark text-white`
                        : `form-control ${usernameError && "is-invalid"}`
                    }
                    placeholder="Username*"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  {usernameError && (
                    <div className="invalid-feedback text-start">
                      {usernameError}
                    </div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className={
                      isDarkMode
                        ? `form-control ${
                            passwordError && "is-invalid"
                          } bg-dark text-white`
                        : `form-control ${passwordError && "is-invalid"}`
                    }
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  {passwordError && (
                    <div className="invalid-feedback text-start">
                      {passwordError}
                    </div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className={
                      isDarkMode
                        ? `form-control ${
                            passwordConfirmError && "is-invalid"
                          } bg-dark text-white`
                        : `form-control ${passwordConfirmError && "is-invalid"}`
                    }
                    placeholder="Confirm Password*"
                    value={password_confirmation}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  {passwordConfirmError && (
                    <div className="invalid-feedback text-start">
                      {passwordConfirmError}
                    </div>
                  )}
                </div>
                <div className="form-group d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={handleSignup}
                    style={{ width: "100%" }}
                  >
                    Sign up
                  </button>
                </div>
                <Terms></Terms>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

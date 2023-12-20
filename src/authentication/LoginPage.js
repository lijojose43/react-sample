import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideImageBlock from "../components/SideImageBlock";
import Toaster from "../components/Toaster";
import { useAppContext } from "../context/AppContext";
import { makeApiCall } from "../utils/utils";
import Terms from "./Terms";

function LoginPage() {
  const { isDarkMode } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const btnPointer = document.querySelector("#login-btn");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showSuccessLogin, setSuccessLogin] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      handleLogin();
    }
  };

  useEffect(() => {
    setUsername("kminchelle");
    setPassword("0lelplR");
  });

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (!value) {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const disableButton = (btnPointer) => {
    btnPointer.innerHTML = "Please wait..";
    btnPointer.setAttribute("disabled", true);
  };
  const enablButton = (btnPointer) => {
    btnPointer.innerHTML = "Please wait..";
    btnPointer.removeAttribute("disabled");
  };
  const handleLogin = async () => {
    setErrorMessage("");
    if (!username) {
      setUsernameError("Username is required");
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      // setUsernameError("Invalid username format");
    } else {
      setUsernameError("");
    }
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (username !== "" && password !== null) {
      disableButton(btnPointer);
      makeApiCall("/auth/login", "POST", {
        username: username,
        password: password,
      })
        .then((response) => {
          enablButton(btnPointer);
          localStorage.setItem("credentials", JSON.stringify(response));
          setErrorMessage("");
          setSuccessLogin(true);
          navigate("/dashboard");
        })
        .catch((error) => {
          setErrorMessage("Incorrect username or password");
          btnPointer.innerHTML = "Login";
          btnPointer.removeAttribute("disabled");
        });
    }
  };

  return (
    <div className="container">
      <div>
        {showSuccessLogin ? (
          <Toaster
            show="true"
            heading="Login"
            message="Welcome, You are loggined successfully!"
          />
        ) : (
          ""
        )}
      </div>
      <div className="col-md-12 mt-5" style={{ height: "100vh" }}>
        <div className="row">
          <SideImageBlock image="/login.svg"></SideImageBlock>
          <div className="col-md-5">
            <h3 className="text-center  mb-3">Sign in to your account</h3>
            <div className="p-3 mb-5 rounded" style={{ margin: "0 auto" }}>
              <div className="card-body">
                {errorMessage && (
                  <p className="text-danger mb-3">{errorMessage}</p>
                )}
                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="username"
                    className={
                      isDarkMode
                        ? `form-control ${
                            usernameError && "is-invalid"
                          } bg-dark text-white`
                        : `form-control ${usernameError && "is-invalid"}`
                    }
                    placeholder="Username*"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete="false"
                    style={{ width: "100%" }}
                  />
                  {usernameError && (
                    <div className="invalid-feedback text-start">
                      {usernameError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <div
                    className={
                      isDarkMode
                        ? `input-group ${
                            passwordError && "is-invalid"
                          } bg-dark text-white`
                        : `input-group ${passwordError && "is-invalid"}`
                    }
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password*"
                      className={
                        isDarkMode
                          ? `form-control ${
                              passwordError && "is-invalid"
                            } bg-dark text-white`
                          : `form-control ${passwordError && "is-invalid"}`
                      }
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      type="button"
                      className={
                        isDarkMode
                          ? `btn btn-outline-secondary ${
                              passwordError && "is-invalid"
                            } bg-dark text-white`
                          : `btn btn-outline-secondary ${
                              passwordError && "is-invalid"
                            }`
                      }
                      onClick={handleTogglePasswordVisibility}
                      style={{ border: "1px #d1cfcf solid" }}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                  {passwordError && (
                    <div className="invalid-feedback text-start">
                      {passwordError}
                    </div>
                  )}
                </div>
                <div
                  className="form-group mb-3"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="form-check-input"
                    />
                    <label htmlFor="rememberMe" style={{ marginLeft: "10px" }}>
                      Remember Me
                    </label>
                  </div>
                  <Link
                    style={{
                      display: "flex",
                      flex: "row",
                      justify: "flex-end",
                    }}
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="form-group d-flex justify-content-between">
                  <button
                    id="login-btn"
                    className="btn btn-primary"
                    onClick={handleLogin}
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                </div>
                <div className="form-group text-center mt-3">
                  {/* New to React Demo? <Link to="/signup">Sign up</Link> */}
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

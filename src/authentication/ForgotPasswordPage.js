import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideImageBlock from "../components/SideImageBlock";
import { useAppContext } from "../context/AppContext";
import { handleEmailChange } from "../utils/utils";

function ForgotPasswordPage() {
  const { isDarkMode } = useAppContext();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleReset = async () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    try {
      const response = await fetch("localhost:8000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setErrorMessage("");
        // Redirect to home page or show success message
      } else {
        setErrorMessage("Incorrect email or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="col-md-12 mt-5">
        <div className="row">
          <SideImageBlock image="/register.svg"></SideImageBlock>
          <div className="col-md-5">
            <h3 className="text-center mb-3">Forgot password</h3>
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
                    type="email"
                    autoComplete="off"
                    className={
                      isDarkMode
                        ? `form-control ${
                            emailError && "is-invalid"
                          } bg-dark text-white`
                        : `form-control ${emailError && "is-invalid"}`
                    }
                    placeholder="Email*"
                    value={email}
                    onChange={(event) =>
                      handleEmailChange(event, setEmail, setEmailError)
                    }
                    style={{ width: "100%" }}
                  />
                  {emailError && (
                    <div className="invalid-feedback text-start">
                      {emailError}
                    </div>
                  )}
                </div>
                <div className="form-group d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={handleReset}
                    style={{ width: "100%" }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <div>
          <h1 className="">React Demo</h1>
          <h5 className="" style={{ fontWeight: "60" }}>
            <i>Sample react application for learning react concepts</i>
          </h5>
          <span>
            <Link
              to="/login"
              className="btn btn-dark"
              style={{
                border: "1px solid #ccc",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-dark"
              style={{ border: "1px solid #ccc", marginTop: "10px" }}
            >
              SignUp
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

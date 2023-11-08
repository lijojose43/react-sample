import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="form-group text-center mt-3">
      By continuing, you agree to our
      <Link to="/terms"> Terms & Conditions </Link> and
      <Link to="/privacy"> Privacy Policy </Link>of React Demo.
    </div>
  );
}

export default Terms;

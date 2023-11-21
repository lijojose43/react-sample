import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="col-md-12 mt-5">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center mb-3">Privacy policy</h3>
            <Link to="#" onClick={() => navigate(-1)}>
              Back
            </Link>
            <div
              className="p-3 mb-5 rounded"
              style={{ margin: "0 auto", textAlign: "justify" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;

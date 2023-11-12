import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../utils";

function LoggedInOutlet(isDarkMode) {
  if (isLoggedIn()) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" isDarkMode={isDarkMode}></Navigate>;
  }
}

export default LoggedInOutlet;

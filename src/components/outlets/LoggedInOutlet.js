import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../utils";

function LoggedInOutlet(isDarkMode) {
  const isLogged = isLoggedIn();
  if (isLogged) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export default LoggedInOutlet;

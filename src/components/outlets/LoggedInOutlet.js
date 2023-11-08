import React from "react";
import { Outlet } from "react-router-dom";
import { isLoggedIn } from "../../utils";

function LoggedInOutlet() {
  if (isLoggedIn()) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <></>;
  }
}

export default LoggedInOutlet;

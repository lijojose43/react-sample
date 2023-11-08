import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import SideImageBlock from "./SideImageBlock";

function ProfilePage({ isDarkMode }) {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // getUserData();
  });

  const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem("credentials"));
    setUserData(userData);
    console.log(userData);
  };

  return (
    <div className="container">
      <div className="col-md-12 mt-5">
        <div className="row">
          <SideImageBlock image="/register.svg"></SideImageBlock>
          <div className="col-md-5">
            <h3 className="text-center mb-3">My Profile</h3>
            <div className="p-3 mb-5 rounded" style={{ margin: "0 auto" }}>
              <div className="card-body">
                <h4>Name : {userData.firstName}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import SideImageBlock from "./SideImageBlock";

function ProfilePage({ isDarkMode }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = () => {
      const storedUserData = JSON.parse(localStorage.getItem("credentials"));
      setUserData(storedUserData);
      console.log(storedUserData);
    };

    getUserData(); // Call the function to fetch user data
  }, []);

  return (
    <div className="container">
      <div className="col-md-12 mt-5">
        <div className="row">
          <SideImageBlock image="/register.svg"></SideImageBlock>
          <div className="col-md-5">
            <h3 className="text-center mb-3">My Profile</h3>
            <div className="p-3 mb-5 rounded" style={{ margin: "0 auto" }}>
              <div className="card-body">
                {userData && (
                  <h5>
                    <img
                      className="mt-3"
                      src={userData.image}
                      style={{
                        height: "180px",
                        width: "180px",
                        borderRadius: "100px",
                      }}
                      alt="Symbol"
                    />
                    <br />
                    <br />
                    Name : {`${userData.firstName} ${userData.lastName}`}
                    <br />
                    <br />
                    Gender : {`${userData.gender}`}
                  </h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

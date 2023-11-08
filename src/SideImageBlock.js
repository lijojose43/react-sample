import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function SideImageBlock(props) {
  return (
    <div className="col-md-6 mt-5 d-none d-sm-block">
      <img
        className="mt-3"
        src={props.image}
        style={{ height: "180px", weight: "180px" }}
        alt="Symbol"
      />
    </div>
  );
}

export default SideImageBlock;

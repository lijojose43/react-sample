import React, { useState } from "react";
import { Toast } from "react-bootstrap";

function Toaster(props) {
  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Toast
        show={show}
        style={{ position: "fixed", top: "10px", right: "10px" }}
        onClose={handleClose}
        autohide="true"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.heading}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Toaster;

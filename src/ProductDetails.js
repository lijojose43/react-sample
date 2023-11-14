import React from "react";
import { Offcanvas } from "react-bootstrap";

const ProductDetails = ({
  productDetails,
  showOffCanvas,
  setShowOffCanvas,
}) => {
  const handleClose = () => setShowOffCanvas(false);

  return (
    <div>
      <Offcanvas show={showOffCanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Product Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {productDetails ? (
            <div>
              <span className="mx-auto">
                <img
                  src={productDetails.images[0]}
                  alt="Symbol"
                  style={{ height: "130px", width: "160px", paddingTop: "3px" }}
                />
              </span>
              <h3>{productDetails && productDetails.title}</h3>
            </div>
          ) : (
            <p>No product details available</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProductDetails;

import React from "react";
import { Carousel, Offcanvas } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import ProductDetailsLoader from "./ProductDetailsLoader";

const ProductDetails = ({
  productDetails,
  showOffProductDetails,
  setShowOffProductDetails,
  isDarkMode,
  isDetailsLoading,
}) => {
  const { cartItems, addToCart } = useCartContext();

  const handleClose = () => setShowOffProductDetails(false);

  return (
    <div>
      <Offcanvas
        show={showOffProductDetails}
        onHide={handleClose}
        placement="end"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#FFF",
          color: isDarkMode ? "#FFF" : "#333",
          borderRadius: "20px 0 0 20px",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong>Product Details</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {isDetailsLoading ? (
          <ProductDetailsLoader isDarkMode={isDarkMode} />
        ) : (
          <Offcanvas.Body>
            {productDetails ? (
              <div
                style={{
                  position: "relative",
                }}
              >
                <span className="mx-auto">
                  <Carousel>
                    {productDetails.images.map((image, index) => (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={image}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </span>
                <h4 className="mt-2">{productDetails.title}</h4>
                <h5>₹{productDetails.price}</h5>
                <span
                  className="badge text-white"
                  style={{ backgroundColor: "blue", borderColor: "blue" }}
                >
                  {productDetails.brand}
                </span>
                <span
                  className="badge text-white"
                  style={{
                    backgroundColor: "blue",
                    borderColor: "blue",
                    marginLeft: "10px",
                  }}
                >
                  {productDetails.category}
                </span>
                <p className="mt-2">{productDetails.description}</p>
                {/* Other content in the parent div */}
                <div
                  style={{
                    position: "sticky",
                    bottom: "-16px",
                    width: "100%",
                    backgroundColor: isDarkMode ? "#333" : "#FFF",
                    padding: "10px",
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        className="btn btn-warning w-100"
                        style={{ borderRadius: "5px" }}
                      >
                        Buy Now
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-success w-100"
                        style={{ borderRadius: "5px" }}
                        onClick={() => addToCart(productDetails)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No product details available</p>
            )}
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default ProductDetails;

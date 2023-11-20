import React, { useContext, useEffect, useState } from "react";
import { Carousel, Offcanvas } from "react-bootstrap";
import CartContext from "./CartContext";
import ProductDetailsLoader from "./ProductDetailsLoader";

const ProductDetails = ({
  productDetails,
  showOffProductDetails,
  setShowOffProductDetails,
  isDarkMode,
  isDetailsLoading,
}) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const { cartCount, updateCartCount } = useContext(CartContext);

  const handleClose = () => setShowOffProductDetails(false);

  useEffect(() => {
    if (JSON.stringify(cartItems) !== "n") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (productDetails) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.id === productDetails.id
    );

    if (itemIndex === -1) {
      // Item doesn't exist, add it to the cart
      setCartItems([...cartItems, productDetails]);
    } else {
      // Item exists, update its quantity (or other properties)
      const updatedCart = [...cartItems];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + 1, // Or update other properties
      };
      setCartItems(updatedCart);
      updateCartCount(updatedCart.length);
    }
  };

  return (
    <div>
      <Offcanvas
        show={showOffProductDetails}
        onHide={handleClose}
        placement="end"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#FFF",
          color: isDarkMode ? "#FFF" : "#333",
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
                <span className="badge badge-success">
                  {productDetails.brand}
                </span>
                <span className="badge badge-success">
                  {productDetails.category}
                </span>
                <p className="mt-3">{productDetails.description}</p>
                {/* Other content in the parent div */}
                <div
                  style={{
                    position: "sticky",
                    bottom: "0px",
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
                        className="btn btn-primary w-100"
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

import React from "react";
import { Offcanvas } from "react-bootstrap";
import ProductDetailsLoader from "./ProductDetailsLoader";

const Cart = ({
  productDetails,
  showCart,
  setShowCart,
  isDarkMode,
  isDetailsLoading,
}) => {
  const handleClose = () => setShowCart(false);
  const cartItems = localStorage.getItems("cart");
  return (
    <div>
      <Offcanvas
        show={showCart}
        onHide={handleClose}
        placement="end"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#FFF",
          color: isDarkMode ? "#FFF" : "#333",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong>Cart</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {isDetailsLoading ? (
          <ProductDetailsLoader isDarkMode={isDarkMode} />
        ) : (
          <Offcanvas.Body>
            {cartItems ? (
              <div>
                <span className="mx-auto">carttt</span>
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default Cart;

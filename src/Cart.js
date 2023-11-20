import React, { useContext, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import AppContext from "./AppContext";
import CartLoader from "./CartLoader";

const Cart = ({ isDarkMode, handleProductDetailsShow }) => {
  const [isCartLoading, setCartLoader] = useState(false);
  const { showCart, handleCartShow } = useContext(AppContext);
  const handleClose = () => handleCartShow(false);
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  return (
    <div>
      <Offcanvas
        show={showCart}
        onHide={handleClose}
        placement="end"
        style={{
          top: "56px",
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
        {isCartLoading ? (
          <CartLoader isDarkMode={isDarkMode} />
        ) : (
          <Offcanvas.Body>
            {cartItems ? (
              <div>
                <span className="mx-auto">
                  {cartItems.map((product, key) => {
                    return (
                      <div
                        className="card"
                        style={{
                          borderRadius: "10px",
                          borderColor: "none",
                          padding: "6px",
                        }}
                        onClick={() => handleProductDetailsShow(product.id)}
                      >
                        <div className="card-body">
                          <div className="d-flex">
                            <img
                              src={product.images[0]}
                              alt="Symbol"
                              style={{ width: "100px" }}
                            />
                            <span className="p-2">
                              {product.title}
                              <br />
                              Quantity : {product.quantity ?? 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </span>
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

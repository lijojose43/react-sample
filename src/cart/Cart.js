import React, { useContext, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import CartLoader from "../cart/CartLoader";
import AppContext from "../context/AppContext";

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
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong>Your Cart</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {isCartLoading ? (
          <CartLoader isDarkMode={isDarkMode} />
        ) : (
          <Offcanvas.Body style={{ paddingTop: "0px" }}>
            {cartItems ? (
              <div>
                <span className="mx-auto">
                  {cartItems.map((product, key) => {
                    return (
                      <div
                        className="card mb-2"
                        style={{
                          borderRadius: "10px",
                          borderColor: "none",
                          backgroundColor: isDarkMode
                            ? "rgb(77 77 77)"
                            : "#FFF",
                        }}
                        onClick={() => handleProductDetailsShow(product.id)}
                      >
                        <div className="card-body">
                          <div className="d-flex">
                            <img
                              src={product.images[0]}
                              alt="Symbol"
                              style={{
                                width: "100px",
                                height: "70px",
                                borderRadius: "10px",
                              }}
                            />
                            <span
                              className={
                                isDarkMode ? "p-2 text-white" : "p-2 text-dark"
                              }
                            >
                              <strong>{product.title}</strong>
                              <br />₹{product.price}
                              <br />
                              <small>Qty : {product.quantity ?? 1}</small>
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

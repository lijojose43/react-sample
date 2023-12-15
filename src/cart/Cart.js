import {
  faCartShopping,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { toast } from "react-toastify";
import CartLoader from "../cart/CartLoader";
import { useAppContext } from "../context/AppContext";
import { useCartContext } from "../context/CartContext";

const Cart = () => {
  const [isCartLoading, setCartLoader] = useState(false);
  const { isDarkMode } = useAppContext();
  const { setCartItems } = useCartContext();
  const { showCart, handleCartShow, handleProductDetailsShow, cartItems } =
    useCartContext();
  const handleClose = () => handleCartShow(false);

  let reversedCartItems = [];
  if (Array.isArray(cartItems)) {
    reversedCartItems = cartItems.slice().reverse();
  }

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    toast.success("Item removed form your cart successfully!");
  };

  return (
    <div>
      <Offcanvas
        show={showCart}
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
            <strong>Your cart</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {isCartLoading ? (
          <CartLoader isDarkMode={isDarkMode} />
        ) : (
          <Offcanvas.Body style={{ paddingTop: "0px" }}>
            {reversedCartItems.length > 0 ? (
              <div>
                <span className="mx-auto">
                  {reversedCartItems.map((product, key) => {
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
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-top">
                            <div className="d-flex align-items-center">
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
                                  isDarkMode
                                    ? "p-2 text-white"
                                    : "p-2 text-dark"
                                }
                              >
                                <strong>{product.title}</strong>
                                <br />₹{product.price}
                                <br />
                                <small>Qty : {product.quantity ?? 1}</small>
                              </span>
                            </div>
                            <div style={{ right: "5px" }}>
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                onClick={() => removeItemFromCart(product.id)}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </span>
              </div>
            ) : (
              <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
                <span className="text-center">
                  <FontAwesomeIcon icon={faCartShopping} size="3x" />
                  <p className="mt-2">Your cart is empty</p>
                </span>
              </div>
            )}
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </div>
  );
};

export default Cart;

import {
  faCartShopping,
  faMinusCircle,
  faPlusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart } from "../actions/cartActions";
import CartLoader from "../cart/CartLoader";
import { useAppContext } from "../context/AppContext";
import { useCartContext } from "../context/CartContext";
import { truncateString } from "../utils/utils";

const Cart = ({ cartItems, removeFromCart }) => {
  const [isCartLoading, setCartLoader] = useState(false);
  const { isDarkMode } = useAppContext();
  const { showCart, handleCartShow, updateCartItems } = useCartContext();
  const handleClose = () => handleCartShow(false);

  let reversedCartItems = [];
  if (Array.isArray(cartItems)) {
    reversedCartItems = cartItems.slice().reverse();
  }

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    updateCartItems(updatedCart);
    toast.success("Cart updated!");
  };

  const updateQuantity = (productId, action) => {
    let updatedCart = [...cartItems];
    const itemIndex = cartItems.findIndex((item) => item.id === productId);
    updatedCart[itemIndex] = {
      ...updatedCart[itemIndex],
      quantity:
        action === 0
          ? updatedCart[itemIndex].quantity - 1
          : updatedCart[itemIndex].quantity + 1,
    };
    updateCartItems(updatedCart);
    if (action === 0 && updatedCart[itemIndex].quantity === 0) {
      updatedCart = cartItems.filter((item) => item.id !== productId);
    }
    updateCartItems(updatedCart);
  };

  const cartTotal = reversedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                                <strong title={product.title}>
                                  {truncateString(product.title, 18)}
                                </strong>
                                <br />₹{product.price}
                                <br />
                                <small
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faMinusCircle}
                                    style={{ marginRight: "10px" }}
                                    onClick={() =>
                                      updateQuantity(product.id, 0)
                                    }
                                  ></FontAwesomeIcon>
                                  Qty : {product.quantity ?? 1}
                                  <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    style={{ marginLeft: "10px" }}
                                    onClick={() =>
                                      updateQuantity(product.id, 1)
                                    }
                                  ></FontAwesomeIcon>
                                </small>
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
                <div className="cart-total">
                  <span className="total-text">Total:</span>
                  <span className="total-amount">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => {
                      toast.warning("Coming soon");
                    }}
                  >
                    Checkout
                  </button>
                </div>
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

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import {
  faArrowLeft,
  faCartShopping,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { useAppContext } from "../context/AppContext";
import { useCartContext } from "../context/CartContext";
import { isLoggedIn } from "../utils/utils";
import Toaster from "./Toaster";
import LoggedInOutlet from "./outlets/LoggedInOutlet";

function Header({ setIsDarkMode }) {
  const navigate = useNavigate();
  const {
    cartCount,
    updateCartCount,
    showCart,
    handleCartShow,
    handleProductDetailsShow,
  } = useCartContext();

  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartCount = cart && cart.length;
    updateCartCount(cartCount);
  }, [updateCartCount]);

  const handleCartClick = (status) => {
    handleCartShow(status);
  };

  const handleLogout = () => {
    localStorage.removeItem("credentials");
    navigate("/login");
  };

  const isHomePage = window.location.pathname === "/";

  var isAuth = isLoggedIn();

  return (
    <>
      <Toaster />
      <Navbar
        bg={isDarkMode ? "dark" : "light"}
        variant={isDarkMode ? "dark" : "light"}
        expand="lg"
        className="mb-3 mx-auto"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home">
            {!isHomePage ? (
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={isDarkMode ? "text-white" : "text-dark"}
                />
              </Link>
            ) : (
              <></>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuth ? (
              <Nav className="ms-auto">
                <Nav.Link href="">
                  <label>
                    <FontAwesomeIcon
                      icon={isDarkMode ? faSun : faMoon}
                      onClick={() => {
                        const mode = !isDarkMode;
                        setIsDarkMode(mode);
                        localStorage.setItem("isDarkMode", mode);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link>
                  <div onClick={() => handleCartClick(!showCart)}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <Badge pill variant="danger" className="ml-1">
                      {cartCount}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link href="#contact">
                  <label htmlFor="dark-mode-switch">
                    <FontAwesomeIcon
                      icon={isDarkMode ? faSun : faMoon}
                      onClick={() => {
                        setIsDarkMode(!isDarkMode);
                        localStorage.setItem("isDarkMode", !isDarkMode);
                      }}
                    />
                  </label>
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoggedInOutlet isDarkMode={isDarkMode} />
      <Cart handleProductDetailsShow={handleProductDetailsShow} />
    </>
  );
}

export default Header;

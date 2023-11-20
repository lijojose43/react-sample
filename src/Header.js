import {
  faArrowLeft,
  faCartShopping,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AppContext, { useAppContext } from "./AppContext";
import LoggedInOutlet from "./components/outlets/LoggedInOutlet";
import { isLoggedIn } from "./utils";

function Header({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const { currentCartCount, updateCartCount } = useContext(AppContext);
  const { showCart, handleCartShow } = useContext(AppContext);

  const { cartCount } = useAppContext();
  useEffect(() => {
    const storedValue = localStorage.getItem("isDarkMode");
    if (storedValue === "true") {
      setIsDarkMode(true);
    }
    const cartCount = JSON.parse(localStorage.getItem("cart")).length;
    updateCartCount(cartCount);
  }, [setIsDarkMode, updateCartCount]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
                <Nav.Link href="#contact">
                  <label htmlFor="dark-mode-switch">
                    <input
                      style={{ margin: "10px", display: "none" }}
                      type="checkbox"
                      id="dark-mode-switch"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
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
                    <input
                      style={{ margin: "10px", display: "none" }}
                      type="checkbox"
                      id="dark-mode-switch"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
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
    </>
  );
}

export default Header;

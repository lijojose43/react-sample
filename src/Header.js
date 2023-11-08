import { faArrowLeft, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoggedInOutlet from "./components/outlets/LoggedInOutlet";
import { isLoggedIn, logOut } from "./utils";

function Header({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  useEffect(() => {
    const storedValue = localStorage.getItem("isDarkMode");
    if (storedValue === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isHomePage = window.location.pathname === "/";

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
            {isLoggedIn() ? (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={logOut()}>
                  Logout
                </Nav.Link>
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
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
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

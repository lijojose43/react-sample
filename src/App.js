import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import ForgotPasswordPage from "./authentication/ForgotPasswordPage";
import LoginPage from "./authentication/LoginPage";
import NotFound from "./authentication/NotFound";
import OfflineAlert from "./authentication/OfflineAlert";
import PrivacyPage from "./authentication/PrivacyPage";
import SignupPage from "./authentication/SignupPage";
import TermsPage from "./authentication/TermsPage";
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import DashboardPage from "./home/DashboardPage";
import ProfilePage from "./home/ProfilePage";
import { isLoggedIn } from "./utils/utils";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem("isDarkMode") === false ? false : true
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  const isLoggedin = isLoggedIn();

  return (
    <>
      {!isOnline ? (
        <OfflineAlert />
      ) : (
        <AppProvider isDarkMode={isDarkMode}>
          <CartProvider>
            <BrowserRouter>
              <div
                style={{
                  backgroundColor: isDarkMode ? "#333" : "#FFF",
                  color: isDarkMode ? "#FFF" : "#333",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="App w-100">
                  <Routes>
                    <Route
                      path=""
                      element={
                        isLoggedin === true ? (
                          <Navigate to="/dashboard" />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/login"
                      element={<LoginPage isDarkMode={isDarkMode} />}
                    />
                    <Route
                      path="/signup"
                      element={<SignupPage isDarkMode={isDarkMode} />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPasswordPage isDarkMode={isDarkMode} />}
                    />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route
                      path="/"
                      element={<Header setIsDarkMode={setIsDarkMode} />}
                    >
                      <Route
                        index
                        path="/dashboard"
                        element={<DashboardPage isDarkMode={isDarkMode} />}
                      />
                      <Route
                        path="/profile"
                        element={<ProfilePage isDarkMode={isDarkMode} />}
                      />
                    </Route>
                  </Routes>
                </div>
              </div>
            </BrowserRouter>
          </CartProvider>
        </AppProvider>
      )}
    </>
  );
}

export default App;

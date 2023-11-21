import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

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
import DashboardPage from "./home/DashboardPage";
import ProfilePage from "./home/ProfilePage";
import { isLoggedIn } from "./utils";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  document.body.style.backgroundColor = isDarkMode ? "#333" : "#FFF";

  useEffect(() => {
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  function handleNetworkChange() {
    setIsOnline(navigator.onLine);
  }

  const isLoggedin = isLoggedIn();
  return (
    <AppProvider>
      {!isOnline ? (
        <OfflineAlert />
      ) : (
        <Provider store={store}>
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
                    element={
                      <Header
                        isDarkMode={isDarkMode}
                        setIsDarkMode={setIsDarkMode}
                      />
                    }
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
        </Provider>
      )}
    </AppProvider>
  );
}

export default App;

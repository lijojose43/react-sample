import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import DashboardPage from "./DashboardPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Header from "./Header";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
import OfflineAlert from "./OfflineAlert";
import PrivacyPage from "./PrivacyPage";
import ProfilePage from "./ProfilePage";
import SignupPage from "./SignupPage";
import TermsPage from "./TermsPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  document.body.style.backgroundColor = isDarkMode ? "#333" : "#FFF";

  function handleNetworkChange() {
    setIsOnline(navigator.onLine);
  }

  const isAuthenticated = true;

  return (
    <>
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
    </>
  );
}

export default App;

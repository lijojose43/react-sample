// AppContext.js
import { createContext, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children, isDarkMode }) => {
  return (
    <AppContext.Provider
      value={{
        isDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState(null);
  

  
  const setAuthValue = (value) => {
     password, setPassword(value);
  };

  const setLoggedInValue = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <AuthContext.Provider
      value={{ setAuthValue, setLoggedInValue, isLoggedIn, password }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
};

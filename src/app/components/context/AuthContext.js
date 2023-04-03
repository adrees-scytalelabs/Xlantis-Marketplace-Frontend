import React, { useContext, createContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

import React, { useContext, createContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  // if (user) console.log("Testing new type user: ", user);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

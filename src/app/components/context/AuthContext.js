import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../assets/js/firebase";
import { Redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState({});
  const provider = new GoogleAuthProvider();

  const googleSignIn = () => {
    // const result =
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("the result: ", result);
        setUser(result.user);
        setAccessToken(credential.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
    // setUser(result.user);

    // return result;
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("new type user: ", currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  // if (user) console.log("Testing new type user: ", user);

  return (
    <AuthContext.Provider value={{ googleSignIn, user, logOut, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

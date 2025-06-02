import { View, Text } from "react-native";
import React, { useState, useEffect, createContext, useContext } from "react";
import { currentActiveAccount } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    currentActiveAccount()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

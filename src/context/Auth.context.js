import React, { useState } from "react";

const initialState = {
  loggedIn: false,
  username: "",
};

export const AuthContext = React.createContext(initialState);

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setLogInInfo = (loggedIn, username) => setState({ loggedIn, username });

  const logIn = (username) => {
    setLogInInfo(true, username);
  };

  const logOut = () => {
    setLogInInfo(false, "");
  };

  return (
    <AuthContext.Provider value={{ state, logIn, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

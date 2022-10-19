import React, { useState } from "react";

const initialState = {
  loggedIn: false,
  username: "",
  admin: false,
};

export const AuthContext = React.createContext(initialState);

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setLogInInfo = (loggedIn, username, admin) =>
    setState({ ...state, loggedIn, username, admin });

  const logIn = (username, admin) => {
    setLogInInfo(true, username, admin);
  };

  const logOut = () => {
    setLogInInfo(false, "", false);
  };

  return (
    <AuthContext.Provider value={{ state, logIn, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

import { useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { AuthContext } from "../context/Auth.context";
import login from "../api/AuthAPI";

function Root({}) {
  const { state, logIn, openAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!state.loggedIn) {
      const getSavedUser = async () => {
        const savedUsername = localStorage.getItem("username");
        const [status, admin] = await login(
          savedUsername,
          localStorage.getItem("password")
        );
        console.log(status, admin);
        if (savedUsername && status === "success") {
          logIn(savedUsername, admin);
        }
      };
      getSavedUser();
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
export default Root;

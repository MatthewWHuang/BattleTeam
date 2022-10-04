import { useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { AuthContext } from "../context/Auth.context";
import login from "../api/AuthAPI";

function Root({}) {
  const { state, logIn } = useContext(AuthContext);

  useEffect(() => {
    const getSavedUser = async () => {
      const savedUsername = localStorage.getItem("username");
      console.log("saved username");
      console.log(savedUsername);
      const status = await login(
        savedUsername,
        localStorage.getItem("password")
      );
      if (savedUsername && status === "success") {
        logIn(savedUsername);
      }
    };
    getSavedUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
export default Root;

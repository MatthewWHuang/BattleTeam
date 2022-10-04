import { useState, useContext } from "react";
import login from "../api/AuthAPI";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

function Login({}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const { state, logIn } = useContext(AuthContext);

  const handleLoginPress = async (e) => {
    e.preventDefault();
    const status = await login(username, password);
    if (status === "success") {
      console.log("success");
      navigate("/");
      logIn(username);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else if (status === "incorrect") {
      setNotification("Username/password incorrect");
      console.log("incorrect");
      setPassword("");
    } else {
      setNotification("Sorry, something went wrong.");
    }
  };
  return (
    <div>
      <h1>Log In</h1>
      <p style={{ color: "red" }}>{notification}</p>
      <form>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <label htmlFor="pass">Password: </label>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit" onClick={handleLoginPress}>
          LOG IN
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>!
      </p>
    </div>
  );
}

export default Login;

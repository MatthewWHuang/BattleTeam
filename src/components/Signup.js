import { useState, useContext, useEffect } from "react";
import login, { signup } from "../api/AuthAPI";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

function Signup({}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const { state, logIn } = useContext(AuthContext);

  const handleSignupPress = async (e) => {
    e.preventDefault();
    const status = await signup(username, password);
    if (status === "success") {
      navigate("/");
      logIn(username);
    } else if (status === "usernametaken") {
      setNotification("Username taken, please try another.");
    } else {
      setNotification("Sorry, something went wrong.");
    }
    // const success = await login(username, password);
    // if (success) {
    //   console.log("success");
    //   navigate("/");
    //   logIn(username);
    // } else {
    //   console.log("incorrect");
    //   setPassword("");
    // }
  };

  useEffect(() => {
    document.title = "Sign Up - Battle Team";
  });

  return (
    <div>
      <h1>Sign Up</h1>
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
        <button type="submit" onClick={handleSignupPress}>
          SIGN UP
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>!
      </p>
    </div>
  );
}

export default Signup;

import { useState, useContext, useEffect } from "react";
import login from "../api/AuthAPI";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

function Login({}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");
    const { state, logIn, openAdmin } = useContext(AuthContext);

    const handleLoginPress = async (e) => {
        e.preventDefault();
        const [status, admin] = await login(username, password);
        if (status === "success") {
            logIn(username, admin);
            // if (admin) {
            //     openAdmin();
            // }
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            console.log("username saved");
            navigate("/");
        } else if (status === "incorrect") {
            setNotification("Username/password incorrect");
            setPassword("");
        } else {
            setNotification("Sorry, something went wrong.");
        }
    };

    useEffect(() => {
        document.title = "Log In - Battle Team";
    });

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

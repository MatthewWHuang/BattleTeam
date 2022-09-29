import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";
function NavBar({}) {
  const { state } = useContext(AuthContext);
  console.log("state");
  console.log(state);
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "gray",
        height: 50,
        marginBottom: 5,
        borderBottomStyle: "solid",
        borderBottomColor: "black",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ textDecoration: "initial" }}>
        <div>
          <h1
            style={{
              margin: 0,
              marginLeft: 20,
              marginRight: 20,
              color: "black",
            }}
          >
            Battle Team
          </h1>
        </div>
      </Link>
      {!state.loggedIn ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/login" style={{ textDecoration: "initial" }}>
            <div>
              {/* <button>Log In</button> */}
              <h3
                style={{
                  margin: 0,
                  marginLeft: 20,
                  marginRight: 20,
                  color: "black",
                }}
              >
                Log In
              </h3>
            </div>
          </Link>
          <Link to="/signup" style={{ textDecoration: "initial" }}>
            <div>
              {/* <button>Log In</button> */}
              <h3
                style={{
                  margin: 0,
                  marginLeft: 20,
                  marginRight: 20,
                  color: "black",
                }}
              >
                Sign Up
              </h3>
            </div>
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3
            style={{ marginRight: 10, cursor: "pointer" }}
            title="Coming Soon!!!"
          >
            My Characters
          </h3>
          <h4 style={{ color: "darkGray", cursor: "default" }}>
            {state.username}
          </h4>
        </div>
      )}
    </div>
  );
}

export default NavBar;

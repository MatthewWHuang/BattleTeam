import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function NavBar({}) {
  const { state } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState("");
  const location = useLocation();

  useEffect(() => {
    setOpenMenu("");
  }, [location]);
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
          <h1 style={{ color: "black", marginRight: 25 }}>Battle Team</h1>
          {/* <img
            style={{ width: 150, marginRight: 25 }}
            src={require("../images/BattlunLogo.png")}
            alt="Battlun"
          /> */}
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
          <div style={{ marginRight: 20 }}>
            <div
            // style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                onClick={() => {
                  openMenu === "char" ? setOpenMenu("") : setOpenMenu("char");
                }}
              >
                <h3 style={{ marginBottom: 0 }}>Character</h3>
              </div>
              {openMenu === "char" ? (
                <div
                  style={{
                    backgroundColor: "lightgray",
                    position: "absolute",
                    borderStyle: "solid",
                    width: 150,
                  }}
                >
                  {state.username === "rickrollme" ? (
                    <a href="https://rr.noordstar.me/data/e0cffb66">
                      <h3
                        style={{
                          marginRight: 0,
                          cursor: "pointer",
                          marginTop: 0,
                        }}
                      >
                        My Characters
                      </h3>
                    </a>
                  ) : (
                    <Link to="/list/characters">
                      <h3
                        style={{
                          marginRight: 0,
                          cursor: "pointer",
                          marginTop: 0,
                        }}
                      >
                        My Characters
                      </h3>
                    </Link>
                  )}
                  <Link to="/create/character">
                    {/* <div onClick={setOpenMenu("")}> */}
                    <h3
                      style={{
                        marginRight: 0,
                        cursor: "pointer",
                        marginTop: 0,
                        borderTopStyle: "solid",
                      }}
                    >
                      Create Character
                    </h3>
                    {/* </div> */}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ marginRight: 20 }}>
            <div
            // style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                onClick={() => {
                  openMenu === "books" ? setOpenMenu("") : setOpenMenu("books");
                }}
              >
                <h3 style={{ marginBottom: 0 }}>Books(WIP, UNSAFE)</h3>
              </div>
              {openMenu === "books" ? (
                <div
                  style={{
                    backgroundColor: "lightgray",
                    position: "absolute",
                    borderStyle: "solid",
                    width: 150,
                  }}
                >
                  <Link to="/list/books">
                    <h3
                      style={{
                        marginRight: 0,
                        cursor: "pointer",
                        marginTop: 0,
                      }}
                    >
                      My Books
                    </h3>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <h4 style={{ color: "darkGray", cursor: "default", marginLeft: 10 }}>
            {state.username}
          </h4>
        </div>
      )}
    </div>
  );
}

export default NavBar;

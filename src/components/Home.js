import { useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { getAd } from "../api/AdAPI";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();

function Home({ globalVals, setGlobalVals }) {
    const navigate = useNavigate();
    const [characterName, setCharacterName] = useState("");
    const { state, logIn } = useContext(AuthContext);
    const [ad, setAd] = useState("loading");

    const characterSelectChanged = (e) => {
        setCharacterName(e.target.value);
    };

    const enterAdmin = (e) => {
        e.preventDefault();
        var pass = prompt(
            "Enter the correct password or you shall be sacrificed to our Dragon Cave..."
        );
        if (pass === "BT1vsSoop") {
            // setInAdmin(true);
            alert("You have entered Admin Mode!!!");
        } else {
            alert("INCORRECT!!! SACRAFICE THEM TO THE DRAGONS!!!");
        }
    };

    useEffect(() => {
        document.title = "Battle Team";
        const get = async () => {
            const data = await getAd();
            setAd(data);
        };
        get();
    });

    const createCharacter = () => {};
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            {state.loggedIn ? (
                <div style={{ marginRight: 50 }}>
                    <ul>
                        <li>
                            {state.username === "rickrollme" ? null : (
                                <Link to="/list/characters">
                                    <p>View my characters</p>
                                </Link>
                            )}
                        </li>
                        <li>
                            <Link to="/create/character">
                                <p>Create a character</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : (
                <div style={{ width: "25vw" }}>
                    <h2 style={{ fontWeight: "normal" }}>
                        Welcome To The Offical <b>Battle Team</b> Website!
                    </h2>
                    <h4 style={{ fontWeight: "normal" }}>
                        <Link to="/signup">Create A Free Account</Link> To
                        Access Our Character Sheets, Rulebooks, And More!
                    </h4>
                    <img
                        style={{ width: "25vw" }}
                        src={require(`../images/CharacterSheet.png`)}
                        alt={"A digital Battle Team character sheet"}
                    />
                </div>
            )}
            {ad === "loading" ? null : (
                <div style={{ flexDirection: "column", borderStyle: "dashed" }}>
                    <h3>{ad.topText}</h3>
                    <Link to={ad.img.link}>
                        <img
                            style={{ height: "70vh" }}
                            alt={ad.img.alt}
                            src={require(`../images/${ad.img.src}.png`)}
                        />
                    </Link>
                    <h3>{ad.bottomText}</h3>
                </div>
            )}
        </div>
    );
}
export default Home;

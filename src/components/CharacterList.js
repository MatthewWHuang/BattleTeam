import { Outlet, Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { getCharacter, idsToInfo } from "../api/CharacterAPI";
import { getCharacters } from "../api/AuthAPI";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";

function CharacterList({}) {
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();

    const [characters, setCharacters] = useState("loading");
    useEffect(() => {
        const getData = async () => {
            const ids = await getCharacters(state.username);
            try {
                const names = await idsToInfo(ids);
                var newCharacters = Object.keys(names)
                    .map((id) => {
                        const idVal = names[id];
                        if (idVal.level) {
                            return {
                                id,
                                ...idVal,
                            };
                        } else {
                            return "none";
                        }
                    })
                    .filter((char) => char !== "none");
            } catch {
                var newCharacters = [];
            }
            // for (let id in ids) {
            //   console.log(await getCharacter(id));
            //   console.log({ name: await getCharacter(id).name, id });
            //   newCharacters.push({ name: await getCharacter(id).name, id });
            // }
            // console.log("new characters");
            // console.log(newCharacters);
            setCharacters(newCharacters || []);
        };
        getData();
        document.title = "Character List - Battle Team";
    });
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {state.username !== "" ? (
                characters === "loading" ? (
                    <h1>Loading</h1>
                ) : (
                    <div>
                        <h1>
                            MY CHARACTERS({characters.length}/
                            {state.admin ? "∞" : "8"})
                        </h1>
                        {characters.length > 0 ? (
                            characters.map((c) => {
                                return (
                                    <div
                                        onClick={() => {
                                            navigate(`/character/${c.id}`);
                                        }}
                                        key={c.id}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderStyle: "solid",
                                            width: 400,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            marginTop: 20,
                                            borderRadius: 5,
                                            backgroundColor: "whitesmoke",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <h1
                                            style={{
                                                height: "min-content",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                margin: 0,
                                            }}
                                        >
                                            {c.name}
                                        </h1>
                                        <p
                                            style={{
                                                textAlign: "center",
                                                height: "min-content",
                                                marginLeft: 25,
                                                width: "max-content",
                                                margin: 0,
                                            }}
                                        >
                                            Level {c.level}
                                            {c.class != "none"
                                                ? " " + c.class
                                                : ", no class"}
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <h4>
                                    You do not have any characters yet.{" "}
                                    <Link to="/create/character">
                                        Create one
                                    </Link>{" "}
                                    now!
                                </h4>
                            </div>
                        )}
                    </div>
                )
            ) : (
                <h1>Please log in to view characters</h1>
            )}
        </div>
    );
}
export default CharacterList;

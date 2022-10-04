import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { getCharacter, idsToInfo } from "../api/CharacterAPI";
import { getCharacters } from "../api/AuthAPI";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";

function CharacterList({}) {
  const { state } = useContext(AuthContext);

  const [characters, setCharacters] = useState("loading");
  useEffect(() => {
    const getData = async () => {
      console.log(state.username);
      const ids = await getCharacters(state.username);
      console.log(ids);
      const names = await idsToInfo(ids);
      var newCharacters = Object.keys(names).map((id) => {
        const idVal = names[id];
        return {
          id,
          ...idVal,
        };
      });
      console.log("names");
      console.log(names);
      console.log("new");
      console.log(newCharacters);
      // for (let id in ids) {
      //   console.log(await getCharacter(id));
      //   console.log({ name: await getCharacter(id).name, id });
      //   newCharacters.push({ name: await getCharacter(id).name, id });
      // }
      // console.log("new characters");
      // console.log(newCharacters);
      setCharacters(newCharacters);
    };
    getData();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {state.username !== "" ? (
        characters === "loading" ? (
          <h1>Loading</h1>
        ) : (
          characters.map((c) => {
            console.log("hihiih");
            console.log("characters");
            console.log(c);
            return (
              <Link
                to={`/character/${c.id}`}
                key={c.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderStyle: "solid",
                  width: "min-content",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <h1 style={{ height: "min-content" }}>{c.name}</h1>
                <p
                  style={{
                    textAlign: "center",
                    height: "min-content",
                    marginLeft: 25,
                    width: "max-content",
                  }}
                >
                  Level {c.level} {c.class}
                </p>
              </Link>
            );
          })
        )
      ) : (
        <h1>Please log in to view characters</h1>
      )}
    </div>
  );
}
export default CharacterList;

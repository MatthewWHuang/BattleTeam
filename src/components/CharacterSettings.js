import React, { useEffect, useState } from "react";
import Box from "./Box";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import useCharacter, { updateCharacter } from "../api/CharacterAPI";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CharacterSettings({}) {
  // let [searchParams, setSearchParams] = useSearchParams();

  const { characterID } = useParams();
  const [result, setResult] = useState("none");
  const [resultSource, setResultSource] = useState("none");
  const info = useCharacter(characterID);
  const [newInfo, setNewInfo] = useState({});
  useEffect(() => {
    setNewInfo(info);
  }, [info]);
  // useEffect(() => {
  //   const characterRef = ref(db, "characters/" + characterName);
  //   onValue(characterRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     // setCharacter(data);
  //     setInfo(data);
  //   });
  // }, []);

  const update = (e) => {
    e.preventDefault();
    updateCharacter(characterID, newInfo);
  };
  if (!info || !info.level) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <div>
          <h3 style={{ display: "flex" }}>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignContent: "left" }}>
        <Link to=".." relative="path">
          <FontAwesomeIcon style={{ color: "black" }} icon={faArrowLeft} />
        </Link>
      </div>
      <form style={{ justifyContent: "left" }}>
        <label
          // style={{ display: "inline" }}
          for="name"
        >
          Name:
        </label>
        <input
          // style={{ display: "inline" }}
          type="text"
          onChange={(e) =>
            setNewInfo((old) => ({ ...old, ...{ name: e.target.value } }))
          }
          value={newInfo.name}
          id="name"
        />
        <br />
        <label for="level">Level: </label>
        <input
          // style={{ display: "inline" }}
          type="text"
          onChange={(e) =>
            setNewInfo((old) => ({ ...old, ...{ level: e.target.value } }))
          }
          value={newInfo.level}
          id="level"
        />
        <br />
        <button onClick={update}>UPDATE</button>
      </form>
    </div>
  );
}
export default CharacterSettings;

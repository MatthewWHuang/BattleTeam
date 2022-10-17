import React, { useEffect, useState } from "react";
import Box from "./Box";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import useCharacter, {
  updateCharacter,
  deleteCharacter as deleteChar,
} from "../api/CharacterAPI";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import getClass from "../api/ClassAPI";

function CharacterSettings({}) {
  // let [searchParams, setSearchParams] = useSearchParams();

  const { characterID } = useParams();
  const [result, setResult] = useState("none");
  const [resultSource, setResultSource] = useState("none");
  const info = useCharacter(characterID);
  const [newInfo, setNewInfo] = useState({});
  const [classInfo, setClassInfo] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    setNewInfo(info);
    document.title = info.name + " - Battle Team";
  }, [info]);
  useEffect(() => {
    const getClassInfo = async () => {
      if (newInfo.class) {
        if (newInfo.class !== "none") {
          setClassInfo(await getClass(newInfo.class.toLowerCase()));
        } else {
          setClassInfo({});
        }
      }
    };
    getClassInfo();
  }, [info, newInfo]);
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

  const attributeIncreaseClicked = (e) => {
    e.preventDefault();
    setNewInfo({
      ...newInfo,
      attributes: {
        ...newInfo.attributes,
        [e.target.id]: newInfo.attributes[e.target.id] + 1,
      },
    });
  };

  const deleteCharacter = () => {
    if (
      window.confirm(
        "Are you sure you want to delete " +
          info.name +
          "? This action cannot be undone!!!!!"
      )
    ) {
      deleteChar(characterID);
      navigate("/");
    }
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
      <div style={{ display: "flex" }}>
        <div style={{ alignContent: "left" }}>
          <Link to=".." relative="path">
            <FontAwesomeIcon style={{ color: "black" }} icon={faArrowLeft} />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            width: "100%",
          }}
        >
          <div onClick={deleteCharacter}>
            <FontAwesomeIcon
              style={{ height: "25px", color: "red" }}
              icon={faTrash}
            />
          </div>
        </div>
      </div>
      <form style={{ justifyContent: "left" }}>
        <label
          // style={{ display: "inline" }}
          htmlFor="name"
        >
          Name:
        </label>
        <input
          // style={{ display: "inline" }}
          type="text"
          onChange={(e) =>
            setNewInfo((old) => ({ ...old, ...{ name: e.target.value } }))
          }
          value={newInfo.name || ""}
          id="name"
        />
        <br />
        <label htmlFor="level">Level: </label>
        <input
          // style={{ display: "inline" }}
          type="number"
          onChange={(e) => {
            if (e.target.value >= 1 && e.target.value % 1 === 0) {
              setNewInfo((old) => ({ ...old, ...{ level: e.target.value } }));
            }
          }}
          value={newInfo.level || 1}
          id="level"
          min={1}
          step={1}
        />
        <br />
        <label htmlFor="class">Class: </label>
        <select
          id="class"
          onChange={(e) =>
            setNewInfo((old) => ({ ...old, ...{ class: e.target.value } }))
          }
          value={newInfo.class}
        >
          <option value="none">--</option>
          <option value="fighter">Fighter</option>
          <option value="healer">Healer</option>
          <option value="mage">Mage</option>
          <option value="rogue">Rogue</option>
          <option value="loser">Loser</option>
        </select>
        <br />
        {Object.keys(info.attributes).map((atr) => {
          return (
            <div key={atr}>
              <label htmlFor={atr}>{atr.toUpperCase()}: </label>
              <p style={{ display: "inline" }}>
                {newInfo.attributes
                  ? newInfo.attributes[atr] +
                    (classInfo && classInfo.stats
                      ? (classInfo.stats.begin[atr] || 0) +
                        (classInfo.stats.level[atr] || 0) * (newInfo.level - 1)
                      : 0)
                  : 10}
              </p>
              {newInfo.attributes ? (
                Object.values(
                  Object.keys(info.attributes).map(
                    (a) =>
                      newInfo.attributes[a] +
                      (classInfo && classInfo.stats
                        ? (classInfo.stats.begin[a] || 0) +
                          (classInfo.stats.level[a] || 0) * (newInfo.level - 1)
                        : 0)
                  )
                ).reduce((a, b) => a + b, 0) >=
                65 +
                  ((newInfo.level - 1) * 5 +
                    (newInfo.class !== "none"
                      ? Object.keys(info.attributes)
                          .map((s) => {
                            if (
                              classInfo &&
                              classInfo.stats &&
                              Object.keys(classInfo.stats.begin).includes(s)
                            ) {
                              return (
                                classInfo.stats.begin[s] +
                                classInfo.stats.level[s] * (info.level - 1)
                              );
                            } else {
                              return 0;
                            }
                          })
                          .reduce((a, b) => a + b, 0)
                      : 0)) ? null : (
                  <button
                    style={{ padding: 0, marginLeft: 5 }}
                    id={atr}
                    onClick={attributeIncreaseClicked}
                  >
                    +
                  </button>
                )
              ) : (
                <div />
              )}

              {/* <input
                // style={{ display: "inline" }}
                type="number"
                onChange={(e) =>
                  setNewInfo((old) => ({
                    ...old,
                    ...{
                      attributes: {
                        ...old.attributes,
                        [atr]: e.target.value,
                      },
                    },
                  }))
                }
                value={newInfo.attributes ? newInfo.attributes[atr] : 10}
                id={atr}
                style={{ width: 40 }}
              /> */}
            </div>
          );
        })}
        <button onClick={update}>UPDATE</button>
      </form>
    </div>
  );
}
export default CharacterSettings;

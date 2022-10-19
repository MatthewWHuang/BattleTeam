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
import {
  faArrowLeft,
  faGrinTongueSquint,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import getClass, { getClasses } from "../api/ClassAPI";
import getBaseSkill from "../api/SkillAPI";

function CharacterSettings({}) {
  // let [searchParams, setSearchParams] = useSearchParams();

  const { characterID } = useParams();
  const [result, setResult] = useState("none");
  const [resultSource, setResultSource] = useState("none");
  const info = useCharacter(characterID);
  const [newInfo, setNewInfo] = useState({});
  const [classInfo, setClassInfo] = useState({});
  const [classes, setClasses] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setNewInfo(info);
    document.title = info.name + " - Battle Team";
  }, [info]);
  useEffect(() => {
    const getClassInfo = async () => {
      if (newInfo.class) {
        if (newInfo.class !== "none") {
          setClassInfo(
            await getClass(
              newInfo.class[newInfo.class.length - 1].toLowerCase()
            )
          );
        } else {
          setClassInfo({});
        }
      }
    };
    const loadClasses = async () => {
      const data = await getClasses();
      setClasses(data);
    };
    getClassInfo();
    loadClasses();
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

  const changeClass = async (e) => {
    const nInfo = {
      ...newInfo,
      ...{ class: [e.target.value] },
    };
    if (e.target.value === "none") {
      nInfo.actions = nInfo.actions.filter((v, i) => {
        return v.name === "Unarmed Attack";
      });
      nInfo.actions.push(await getBaseSkill("MagicBolt"));
    } else {
      const newClassInfo = await getClass(e.target.value);

      if (e.target.value !== "Mage") {
        nInfo.actions = nInfo.actions.filter((v, i) => {
          return v.name !== "Magic Bolt";
        });
      }
      console.log(Object.keys(newClassInfo.skills));
      Object.keys(newClassInfo.skills).forEach((pos) => {
        console.log(pos);
        if (newInfo.level >= parseInt(pos)) {
          nInfo.actions.push(...newClassInfo.skills[pos]);
        }
      });
    }
    console.log("done!");

    setNewInfo(nInfo);
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
            if (
              e.target.value >= 1 &&
              e.target.value % 1 === 0 &&
              e.target.value <= 120
            ) {
              setNewInfo((old) => ({ ...old, ...{ level: e.target.value } }));
            }
          }}
          value={newInfo.level || 1}
          id="level"
          min={1}
          step={1}
          max={120}
        />
        <br />
        <label htmlFor="class">Class: </label>
        {[1, 20, 40, 60, 80, 100, 120]
          .slice(0, Math.ceil((parseInt(newInfo.level) + 1) / 20))
          .map((l) => {
            console.log(l, parseInt(newInfo.level) + 1);
            return (
              <select
                key={"classSelect" + String(l)}
                id="class"
                onChange={changeClass}
                value={newInfo.class[0]}
              >
                <option value="none">--</option>
                {Object.keys(classes).map((c) => (
                  <option key={c} value={c}>
                    {classes[c].name}
                  </option>
                ))}
              </select>
            );
          })}
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

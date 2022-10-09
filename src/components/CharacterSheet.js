import React, { useEffect, useState } from "react";
import Box from "./Box";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import useCharacter from "../api/CharacterAPI";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { getExpForLevel } from "../helpers/CharacterCalcs";
function CharacterSheet({}) {
  // let [searchParams, setSearchParams] = useSearchParams();

  const { characterID } = useParams();
  const [result, setResult] = useState("none");
  const [resultSource, setResultSource] = useState("none");
  const [resultExtra, setResultExtra] = useState("");
  const info = useCharacter(characterID);

  // useEffect(() => {
  //   const characterRef = ref(db, "characters/" + characterName);
  //   onValue(characterRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     // setCharacter(data);
  //     setInfo(data);
  //   });
  // }, []);

  const dismissResult = () => {
    setResult("none");
    setResultSource("none");
  };

  const roll = (sides) => {
    setResult(Math.ceil(Math.random() * sides));
    setResultSource("D" + sides);
  };

  const rollAtr = (dice, bonuses, src) => {
    console.log("hihihihierooiavhwiehpg9vbio");
    console.log(
      dice.map((r) => "d" + r.toString()).join(" + ") +
        " + " +
        bonuses.map((b) => b.toString()).join(" + ")
    );
    setResultExtra(
      dice.map((r) => "d" + r.toString()).join(" + ") +
        " + " +
        bonuses.map((b) => b.toString()).join(" + ")
    );
    setResult(
      dice.map((d) => Math.ceil(Math.random() * d)).reduce((a, b) => a + b, 0) +
        bonuses.reduce((a, b) => a + b, 0)
    );
    setResultSource(src);
  };

  useEffect(() => {
    document.title = info.name + " - Battle Team";
  }, [info]);

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
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <div style={{ flexDirection: "column", padding: 0 }}>
          <h2
            style={{
              marginLeft: 20,
              marginTop: 0,
              marginBottom: 5,
              textAlign: "left",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: 200,
            }}
          >
            {info.name}
          </h2>
          <h6
            style={{
              marginTop: 0,
              marginBottom: 5,
              marginLeft: 25,
              fontWeight: "normal",
              textAlign: "left",
            }}
          >
            {"Level " +
              info.level +
              (info.class == "none" ? ", no class" : " " + info.class)}
          </h6>
        </div>
        <Box style={{ display: "flex", flexDirection: "column", margin: 0 }}>
          <h5 style={{ margin: 0 }}>EXP</h5>
          <div style={{ display: "flex", flexDirection: "row", margin: 0 }}>
            <h2 style={{ display: "flex", margin: 0, marginRight: 10 }}>
              {info.exp}
            </h2>
            <h2
              style={{
                display: "flex",
                margin: 0,
                paddingLeft: 10,
                borderLeftStyle: "solid",
                color: "darkgrey",
              }}
            >
              {getExpForLevel(info.level)}
            </h2>
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            width: "100%",
          }}
        >
          <Link to="settings">
            <FontAwesomeIcon
              style={{ height: "50px", color: "black" }}
              icon={faGear}
            />
          </Link>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          {Object.keys(info.attributes).map((atr) => (
            <div style={{ width: 100 }} key={atr}>
              <Box style={{ height: 72 }}>
                <h1 style={{ margin: 0 }}>{info.attributes[atr]}</h1>
                <h3 style={{ margin: 0 }}>{atr.toUpperCase()}</h3>
              </Box>
            </div>
          ))}
        </div>
        <div style={{ flexDirection: "column", width: 100 }}>
          <Box>
            <h5 style={{ margin: 0 }}>HP</h5>
            <h2 style={{ margin: 0 }}>{info.hp}</h2>
            <h2
              style={{
                margin: 0,
                borderTopStyle: "double",
                marginBottom: 0,
                height: 25,
              }}
            >
              {info.attributes.vit * 10}
            </h2>
            <h6 style={{ margin: 0, fontSize: 8 }}>
              Regen {Math.max(Math.floor(info.attributes.vit / 10), 1)}
            </h6>
          </Box>
          <Box>
            <h5 style={{ margin: 0 }}>MANA</h5>
            <h2 style={{ margin: 0 }}>{info.mana}</h2>
            <h2
              style={{
                margin: 0,
                borderTopStyle: "double",
                marginBottom: 0,
                height: 25,
              }}
            >
              {info.attributes.wis * 10}
            </h2>
            <h6 style={{ margin: 0, fontSize: 8 }}>
              Regen {Math.max(Math.floor(info.attributes.int / 10), 1)}
            </h6>
          </Box>
          <Box>
            {[
              "Fire",
              "Water",
              "Earth",
              "Air",
              "Poision",
              "Acid",
              "Disease",
              "Pure",
              "Dark",
              "Light",
            ].map((res) => (
              <h5
                style={{
                  margin: 0,
                  borderTopStyle: res !== "Fire" ? "dashed" : "none",
                }}
                key={res}
              >
                {res + " res. " + info.resistances[res].toString() + "%"}
              </h5>
            ))}
            <h5
              style={{
                margin: 0,
                borderTopStyle: "dashed",
                textAlign: "center",
              }}
            >
              Piercing res. 0%
            </h5>
            <h5
              style={{
                margin: 0,
                borderTopStyle: "dashed",
                textAlign: "center",
              }}
            >
              Slashing res. 0%
            </h5>
            <h5
              style={{
                margin: 0,
                borderTopStyle: "dashed",
                textAlign: "center",
              }}
            >
              Blud. res. 0%
            </h5>
          </Box>
        </div>
        <div style={{ flexDirection: "column", width: 170 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Box>
                <h5 style={{ margin: 0, width: 50 }}>SPEED</h5>
                <h3
                  style={{
                    margin: 0,
                    width: 50,
                    lineHeight: "0.95em",
                    userSelect: "none",
                  }}
                >
                  {info.speed}
                </h3>
              </Box>
              <Box>
                <h5 style={{ margin: 0, width: 50 }}>AVOID</h5>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "darkgray",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    rollAtr(
                      [Math.floor(info.attributes.dex / 2)],
                      [Math.ceil(info.attributes.dex / 2)],
                      "Avoid"
                    );
                  }}
                >
                  <h3 style={{ margin: 0, width: 50, lineHeight: "0.95em" }}>
                    {Math.ceil(info.attributes.dex / 2).toString() + "+"}
                    <br />
                    {"d" + Math.floor(info.attributes.dex / 2).toString()}
                  </h3>
                </div>
              </Box>
              <Box>
                <h5 style={{ margin: 0, width: 50 }}>HIT</h5>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "darkgray",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    rollAtr(
                      [Math.floor(info.attributes.dex / 2)],
                      [Math.ceil(info.attributes.dex / 2)],
                      "Hit"
                    );
                  }}
                >
                  <h3 style={{ margin: 0, width: 50, lineHeight: "0.95em" }}>
                    {Math.ceil(info.attributes.dex / 2).toString() + "+"}
                    <br />
                    {"d" + Math.floor(info.attributes.dex / 2).toString()}
                  </h3>
                </div>
              </Box>
              <Box>
                <h5 style={{ margin: 0, width: 50 }}>M. HIT</h5>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "darkgray",
                    userSelect: "none",
                  }}
                  onClick={() => {
                    rollAtr(
                      [
                        Math.ceil(
                          (info.attributes.wis + info.attributes.wis) / 4
                        ),
                      ],
                      [
                        Math.floor(
                          (info.attributes.wis + info.attributes.wis) / 4
                        ),
                      ],
                      "Magical Hit"
                    );
                  }}
                >
                  <h3 style={{ margin: 0, width: 50, lineHeight: "0.95em" }}>
                    {Math.ceil(
                      (info.attributes.wis + info.attributes.wis) / 4
                    ).toString() + "+"}
                    <br />
                    {"d" +
                      Math.floor(
                        (info.attributes.wis + info.attributes.wis) / 4
                      ).toString()}
                  </h3>
                </div>
              </Box>
            </div>
            <div>
              <Box>
                <h6 style={{ margin: 0, width: 50 }}>Copper</h6>
                <h3 style={{ margin: 0, width: 50 }}>0</h3>
                <h6 style={{ margin: 0, width: 50, borderTopStyle: "dashed" }}>
                  Silver
                </h6>
                <h3 style={{ margin: 0, width: 50 }}>0</h3>
                <h6 style={{ margin: 0, width: 50, borderTopStyle: "dashed" }}>
                  Gold
                </h6>
                <h3 style={{ margin: 0, width: 50 }}>0</h3>
                <h6 style={{ margin: 0, width: 50, borderTopStyle: "dashed" }}>
                  Platinum
                </h6>
                <h3 style={{ margin: 0, width: 50 }}>0</h3>
                <h6 style={{ margin: 0, width: 50, borderTopStyle: "dashed" }}>
                  Amythest
                </h6>
                <h3 style={{ margin: 0, width: 50 }}>0</h3>
                <h6 style={{ margin: 0, width: 50, borderTopStyle: "dashed" }}>
                  Diamond
                </h6>
                <h3 style={{ margin: 0, width: 50 }}>0</h3>
              </Box>
            </div>
          </div>
          <Box style={{ width: 135, height: 425 }}>
            <h5>No Proficencies</h5>
          </Box>
        </div>

        <div>
          <Box style={{ height: 200, flexDirection: "row" }}>
            <div>
              {[
                "Head",
                "Eyes",
                "Mouth",
                "Neck",
                "Chest",
                "Left Hand",
                "Right Hand",
                "Left Wrist",
                "Right Wrist",
                "Legs",
                "Feet",
              ].map((s) => (
                <h6 key={s} style={{ margin: 0 }}>
                  {s + ": None"}
                </h6>
              ))}
            </div>
            <div>
              <h5>Inventory Empty</h5>
            </div>
          </Box>
          <Box style={{ width: 600, height: 469, alignContent: "center" }}>
            <button style={{ width: 50 }} onClick={() => roll(4)}>
              D4
            </button>
            <button style={{ width: 50 }} onClick={() => roll(6)}>
              D6
            </button>
            <button style={{ width: 50 }} onClick={() => roll(8)}>
              D8
            </button>
            <button style={{ width: 50 }} onClick={() => roll(10)}>
              D10
            </button>
            <button style={{ width: 50 }} onClick={() => roll(12)}>
              D12
            </button>
            <button style={{ width: 50 }} onClick={() => roll(20)}>
              D20
            </button>
          </Box>
        </div>
        {/* <p>
          {`VIT: ${info.attributes.vit} 
WIS: ${info.attributes.wis}`}
        </p> */}
      </div>
      {result !== "none" ? (
        <Box
          style={{
            position: "fixed",
            right: 0,
            bottom: 0,
            height: 200,
            width: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "column",
          }}
          onClick={dismissResult}
        >
          <h6 style={{ margin: 0 }}>{resultSource}</h6>
          <h3>{resultExtra}</h3>
          <h1>{result}</h1>
        </Box>
      ) : null}
    </div>
  );
}
export default CharacterSheet;

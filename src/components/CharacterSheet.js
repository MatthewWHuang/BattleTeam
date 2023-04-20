import React, { useEffect, useState } from "react";
import Box from "./Box";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import useCharacter, { updateCharacter } from "../api/CharacterAPI";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6, faGear } from "@fortawesome/free-solid-svg-icons";
import { getExpForLevel } from "../helpers/CharacterCalcs";
import Input from "./Input";
import Item from "./Item";
import { sum } from "../helpers/TypeHelpers";
import getClass from "../api/ClassAPI";

function CharacterSheet({}) {
    // let [searchParams, setSearchParams] = useSearchParams();

    const { characterID } = useParams();
    const [result, setResult] = useState("none");
    const [resultSource, setResultSource] = useState("none");
    const [resultExtra, setResultExtra] = useState("");
    const info = useCharacter(characterID);
    const [currentInfo, setCurrentInfo] = useState(info);
    const [classInfo, setClassInfo] = useState({});

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
        setResultExtra(
            dice.map((r) => "d" + r.toString()).join(" + ") +
                " + " +
                bonuses.map((b) => b.toString()).join(" + ")
        );
        setResult(
            dice
                .map((d) => Math.ceil(Math.random() * d))
                .reduce((a, b) => a + b, 0) + bonuses.reduce((a, b) => a + b, 0)
        );
        setResultSource(src);
    };

    const editChar = async (newInfo, change) => {
        // if (change) {
        updateCharacter(characterID, newInfo);
        // }
        setCurrentInfo(newInfo);
    };

    const getAttribute = (atr) => {
        return (
            info.attributes[atr] +
            (classInfo && classInfo[0] && classInfo[0].stats
                ? sum(
                      Object.values(classInfo).map((c) => {
                          try {
                              return c.stats.begin[atr] || 0;
                          } catch {
                              return 0;
                          }
                      })
                  ) +
                  sum(
                      Object.values(classInfo).map((c) => {
                          try {
                              return c.stats.level[atr] || 0;
                          } catch {
                              return 0;
                          }
                      })
                  ) *
                      info.level -
                  1
                : 0)
        );
    };

    const takeAction = (a) => {
        if (a.tags.includes("attack")) {
            rollAtr(
                [Math.floor(getAttribute("dex") / 2)],
                [Math.ceil(getAttribute("dex") / 2)],
                a.name
            );
        }
        if (a.tags.includes("mAttack")) {
            rollAtr(
                [Math.floor(getAttribute("int") / 2)],
                [Math.ceil(getAttribute("wis") / 2)],
                a.name
            );
        }
        if (Object.keys(a).includes("cost")) {
            if (["hp", "mana"].includes(a.cost.type)) {
                const sl = a.skillLevel || 0 > 0 ? a.skillLevel : 1;
                editChar({
                    ...currentInfo,
                    [a.cost.type.toLowerCase()]: parseInt(
                        currentInfo[a.cost.type.toLowerCase()] -
                            eval(a.cost.value)
                    ),
                });
            } else {
                const sl = a.skillLevel || 0 > 0 ? a.skillLevel : 1;
                editChar({
                    ...currentInfo,
                    classPools: {
                        ...currentInfo.classPools,
                        [a.cost.type.toLowerCase()]: parseInt(
                            currentInfo.classPools[a.cost.type.toLowerCase()] -
                                eval(a.cost.value)
                        ),
                    },
                });
            }
        }
    };

    useEffect(() => {
        const getClassInfo = async () => {
            if (info.class) {
                if (info.class !== "none") {
                    console.log(
                        await Promise.all(
                            Object.values(info.class).map(
                                async (c) => await getClass(c.toLowerCase())
                            )
                        )
                    );
                    setClassInfo(
                        await Promise.all(
                            Object.values(info.class).map(
                                async (c) => await getClass(c.toLowerCase())
                            )
                        )
                    );
                } else {
                    setClassInfo({});
                }
            }
        };
        document.title = info.name + " - Battle Team";
        getClassInfo();
        setCurrentInfo(info);
    }, [info]);

    // useEffect(() => {
    //     updateCharacter(characterID, currentInfo);
    // }, [currentInfo]);

    if (!info || !info.level || !currentInfo.level) {
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "65%",
                }}
            >
                <div style={{ display: "flex", flexDirection: "row" }}>
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
                                (info.class == "none"
                                    ? ", no class"
                                    : " " + info.class)}
                        </h6>
                    </div>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: 0,
                            marginBottom: 10,
                        }}
                    >
                        <h5 style={{ margin: 0 }}>EXP</h5>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: 0,
                            }}
                        >
                            <Input
                                style={{
                                    width: 47,
                                    fontSize: "1.5em",
                                    fontWeight: "bold",
                                    height: 30,
                                }}
                                value={currentInfo.exp}
                                change={(val, change = true) => {
                                    editChar(
                                        {
                                            ...currentInfo,
                                            exp: val,
                                        },
                                        change
                                    );
                                }}
                                max={getExpForLevel(info.level)}
                            />
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
                </div>
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
                                <h1 style={{ margin: 0 }}>
                                    {getAttribute(atr)}
                                </h1>
                                <h3 style={{ margin: 0 }}>
                                    {atr.toUpperCase()}
                                </h3>
                            </Box>
                        </div>
                    ))}
                </div>
                <div style={{ flexDirection: "column", width: 100 }}>
                    <Box>
                        <h5 style={{ margin: 0, color: "red" }}>HP</h5>
                        <Input
                            color="red"
                            value={currentInfo.hp}
                            change={(val) => {
                                editChar({ ...currentInfo, hp: parseInt(val) });
                            }}
                            max={getAttribute("vit") * 10}
                        />
                        <h2
                            style={{
                                margin: 0,
                                borderTopStyle: "double",
                                marginBottom: 0,
                                height: 25,
                                color: "red",
                            }}
                        >
                            {getAttribute("vit") * 10}
                        </h2>
                        <h6 style={{ margin: 0, fontSize: 8, color: "red" }}>
                            Regen{" "}
                            {Math.max(Math.floor(getAttribute("vit") / 10), 1)}
                        </h6>
                    </Box>
                    <Box>
                        <h5 style={{ margin: 0, color: "blue" }}>MANA</h5>
                        <Input
                            color="blue"
                            value={currentInfo.mana}
                            change={(val) => {
                                editChar({
                                    ...currentInfo,
                                    mana: parseInt(val),
                                });
                            }}
                            max={getAttribute("int") * 10}
                        />
                        <h2
                            style={{
                                margin: 0,
                                borderTopStyle: "double",
                                marginBottom: 0,
                                height: 25,
                                color: "blue",
                            }}
                        >
                            {getAttribute("int") * 10}
                        </h2>
                        <h6 style={{ margin: 0, fontSize: 8, color: "blue" }}>
                            Regen{" "}
                            {Math.max(Math.floor(getAttribute("wis") / 10), 1)}
                        </h6>
                    </Box>
                    {Object.keys(info).includes("classPools")
                        ? Object.keys(info.classPools).map((classPool) => (
                              <Box>
                                  <h5 style={{ margin: 0, color: "yellow" }}>
                                      {classPool.toUpperCase()}
                                  </h5>
                                  <Input
                                      color="yellow"
                                      value={currentInfo.classPools[classPool]}
                                      change={(val) => {
                                          editChar({
                                              ...currentInfo,
                                              classPools: {
                                                  ...currentInfo.classPools,
                                                  [classPool]: parseInt(val),
                                              },
                                          });
                                      }}
                                      max={getAttribute(classPool) * 10}
                                  />
                                  <h2
                                      style={{
                                          margin: 0,
                                          borderTopStyle: "double",
                                          marginBottom: 0,
                                          height: 25,
                                          color: "yellow",
                                      }}
                                  >
                                      {getAttribute(classPool) * 10}
                                  </h2>
                                  <h6
                                      style={{
                                          margin: 0,
                                          fontSize: 8,
                                          color: "yellow",
                                      }}
                                  >
                                      Regen{" "}
                                      {Math.max(
                                          Math.floor(
                                              getAttribute(classPool) / 10
                                          ),
                                          1
                                      )}
                                  </h6>
                              </Box>
                          ))
                        : null}
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
                                    borderTopStyle:
                                        res !== "Fire" ? "dashed" : "none",
                                    color: {
                                        Fire: "orange",
                                        Water: "darkblue",
                                        Earth: "darkgray",
                                        Air: "#dcadf5",
                                        Poision: "#5dc55d",
                                        Acid: "green",
                                        Disease: "#8ad8ab",
                                        Pure: "lightcyan",
                                        Dark: "#351c75",
                                        Light: "lightyellow",
                                    }[res],
                                }}
                                key={res}
                            >
                                {res +
                                    " res. " +
                                    info.resistances[res].toString() +
                                    "%"}
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
                                    {Math.floor(getAttribute("agi") / 5)}
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
                                            [
                                                Math.floor(
                                                    getAttribute("dex") / 2
                                                ),
                                            ],
                                            [
                                                Math.ceil(
                                                    getAttribute("dex") / 2
                                                ),
                                            ],
                                            "Avoid"
                                        );
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            width: 50,
                                            lineHeight: "0.95em",
                                        }}
                                    >
                                        {Math.ceil(
                                            getAttribute("dex") / 2
                                        ).toString() + "+"}
                                        <br />
                                        {"d" +
                                            Math.floor(
                                                getAttribute("dex") / 2
                                            ).toString()}
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
                                            [
                                                Math.floor(
                                                    getAttribute("dex") / 2
                                                ),
                                            ],
                                            [
                                                Math.ceil(
                                                    getAttribute("dex") / 2
                                                ),
                                            ],
                                            "Hit"
                                        );
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            width: 50,
                                            lineHeight: "0.95em",
                                        }}
                                    >
                                        {Math.ceil(
                                            getAttribute("dex") / 2
                                        ).toString() + "+"}
                                        <br />
                                        {"d" +
                                            Math.floor(
                                                getAttribute("dex") / 2
                                            ).toString()}
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
                                                    getAttribute("wis") / 2
                                                ),
                                            ],
                                            [
                                                Math.floor(
                                                    getAttribute("int") / 2
                                                ),
                                            ],
                                            "Magical Hit"
                                        );
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            width: 50,
                                            lineHeight: "0.95em",
                                        }}
                                    >
                                        {Math.ceil(
                                            getAttribute("wis") / 2
                                        ).toString() + "+"}
                                        <br />
                                        {"d" +
                                            Math.floor(
                                                getAttribute("int") / 2
                                            ).toString()}
                                    </h3>
                                </div>
                            </Box>
                        </div>
                        <div>
                            <Box>
                                {[
                                    "Copper",
                                    "Silver",
                                    "Gold",
                                    "Platinum",
                                    "Emerald",
                                    "Diamond",
                                ].map((c) => (
                                    <div key={c}>
                                        <h6
                                            style={{
                                                margin: 0,
                                                width: 50,
                                                borderTopStyle:
                                                    c === "Copper"
                                                        ? "none"
                                                        : "dashed",
                                            }}
                                        >
                                            {c}
                                        </h6>
                                        <Input
                                            style={{
                                                width: 47,
                                                fontSize: "1.17em",
                                                fontWeight: "bold",
                                                height: "1.24em",
                                            }}
                                            value={
                                                currentInfo.currency[
                                                    c[0].toLowerCase()
                                                ]
                                            }
                                            change={(val, change = true) => {
                                                editChar(
                                                    {
                                                        ...currentInfo,
                                                        currency: {
                                                            ...currentInfo.currency,
                                                            [c[0].toLowerCase()]:
                                                                parseInt(val),
                                                        },
                                                    },
                                                    change
                                                );
                                            }}
                                            max={Infinity}
                                        />
                                    </div>
                                ))}
                            </Box>
                        </div>
                    </div>
                    <Box style={{ width: 135, height: 425 }}>
                        <h5>No Proficencies</h5>
                    </Box>
                </div>

                <div>
                    <Box
                        style={{
                            height: 200,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
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
            </div> */}
                        <div
                            style={{
                                justifyContent: "center",
                                width: "100%",
                                overflow: "auto",
                            }}
                        >
                            {info.inventory === "empty" ? (
                                <h5>Inventory Empty</h5>
                            ) : (
                                <div>
                                    {info.inventory.map((item, i) => (
                                        <Item
                                            key={i}
                                            enabled
                                            info={item}
                                            player={info}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </Box>
                    <Box
                        style={{
                            width: 600,
                            height: 469,
                            alignContent: "center",
                        }}
                    >
                        <h3 style={{ margin: 0 }}>Actions</h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                borderBottomStyle: "solid",
                                borderTopStyle: "solid",
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            <button
                                style={{
                                    width: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    cursor: "pointer",
                                }}
                                onClick={() => roll(4)}
                            >
                                D4
                            </button>
                            <button
                                style={{
                                    width: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    cursor: "pointer",
                                }}
                                onClick={() => roll(6)}
                            >
                                D6
                            </button>
                            <button
                                style={{
                                    width: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    cursor: "pointer",
                                }}
                                onClick={() => roll(8)}
                            >
                                D8
                            </button>
                            <button
                                style={{
                                    width: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    cursor: "pointer",
                                }}
                                onClick={() => roll(10)}
                            >
                                D10
                            </button>
                            <button
                                style={{
                                    width: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    cursor: "pointer",
                                }}
                                onClick={() => roll(12)}
                            >
                                D12
                            </button>
                            <button
                                style={{
                                    width: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    cursor: "pointer",
                                }}
                                onClick={() => roll(20)}
                            >
                                D20
                            </button>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                overflow: "auto",
                            }}
                        >
                            {(info.actions === "none" ? null : info.actions)
                                .concat(
                                    (info.inventory === "empty"
                                        ? []
                                        : info.inventory
                                    )
                                        .map((item) => item.skills)
                                        .flat()
                                )
                                // .filter(
                                //     (action) =>
                                //         action.tags &&
                                //         action.tags.includes("action")
                                // )
                                .map((a) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <button
                                                style={{
                                                    marginRight: 10,
                                                    visibility:
                                                        a.tags &&
                                                        a.tags.includes(
                                                            "action"
                                                        )
                                                            ? "visible"
                                                            : "hidden",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    takeAction(a);
                                                }}
                                                disabled={(() => {
                                                    const sl =
                                                        a.skillLevel || 0 > 0
                                                            ? a.skillLevel
                                                            : 1;

                                                    return a.cost && a.cost.type
                                                        ? eval(a.cost.value) >
                                                              ([
                                                                  "hp",
                                                                  "mana",
                                                              ].includes(
                                                                  a.cost.type
                                                              )
                                                                  ? currentInfo[
                                                                        a.cost.type.toLowerCase()
                                                                    ]
                                                                  : currentInfo
                                                                        .classPools[
                                                                        a.cost.type.toLowerCase()
                                                                    ])
                                                        : false;
                                                })()}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faDiceD6}
                                                />
                                            </button>

                                            <Item
                                                key={a.name}
                                                enabled={a.skillLevel > 0}
                                                info={a}
                                                player={info}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </Box>
                </div>
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

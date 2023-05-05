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
import { removeCharacterFromAccount } from "../api/AuthAPI";
import { extractNumber, sum } from "../helpers/TypeHelpers";

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
                    console.log(
                        await Promise.all(
                            Object.values(newInfo.class).map(
                                async (c) => await getClass(c.toLowerCase())
                            )
                        )
                    );
                    setClassInfo(
                        await Promise.all(
                            Object.values(newInfo.class).map(
                                async (c) => await getClass(c.toLowerCase())
                            )
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

    const actionIncreaseClicked = (e) => {
        e.preventDefault();
        setNewInfo({
            ...newInfo,
            actions: Object.values({
                ...newInfo.actions,
                [e.target.id]: {
                    ...newInfo.actions[e.target.id],
                    skillLevel: newInfo.actions[e.target.id].skillLevel + 1,
                },
            }),
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
            removeCharacterFromAccount(info.owner, characterID);
            navigate("/");
        }
    };

    const changeClass = async (e) => {
        const nInfo = {
            ...newInfo,
            ...{
                class: {
                    ...newInfo.class,
                    [extractNumber(e.target.id)]: e.target.value,
                },
            },
        };
        if (e.target.value === "none") {
            nInfo.actions = nInfo.actions.filter((v, i) => {
                return (
                    (v.levelUnlocked >= e.target.level &&
                        v.levelUnlocked <= e.target.level + 19) ||
                    v.name === "Unarmed Attack"
                );
            });
            nInfo.actions.push(await getBaseSkill("MagicBolt"));
        } else {
            const newClassInfo = await getClass(e.target.value);

            if (e.target.value !== "Mage") {
                nInfo.actions = nInfo.actions.filter((v, i) => {
                    return (
                        (v.levelUnlocked >= e.target.level &&
                            v.levelUnlocked <= e.target.level + 19) ||
                        v.name !== "Magic Bolt"
                    );
                });
            }
            Object.keys(newClassInfo.skills)
                .map((pos) => [pos, extractNumber(pos)])
                .sort((a, b) => a[1] - b[1])
                .forEach((pos) => {
                    if (newInfo.level >= pos[1]) {
                        nInfo.actions.push(
                            ...newClassInfo.skills[pos[0]].map((s) => ({
                                ...s,
                                levelUnlocked: pos[1],
                            }))
                        );
                    }
                });

            if (Object.keys(newClassInfo).includes("classStat")) {
                nInfo.attributes[newClassInfo.classStat.name] = 0;
                if (newClassInfo.classStat.tags.includes("pool")) {
                    if (Object.keys(nInfo).includes("classPools")) {
                        nInfo.classPools[newClassInfo.classStat.name] = 0;
                    } else {
                        nInfo.classPools = {
                            [newClassInfo.classStat.name]: 0,
                        };
                    }
                }
            }
        }
        setNewInfo(nInfo);
    };

    const changeLevel = async (e) => {
        const newLevel = e.target.value;
        const nInfo = {
            ...newInfo,
        };
        if (newLevel >= 1 && newLevel % 1 === 0 && newLevel <= 140) {
            const classInfo = [];
            for (let c of Object.values(newInfo.class)) {
                classInfo.push(await getClass(c));
            }
            var actions = classInfo
                .map((c) => {
                    return Object.keys(c.skills)
                        .map((pos) => {
                            if (parseInt(newLevel) >= parseInt(pos)) {
                                return c.skills[pos].map((skill) => {
                                    if (
                                        newInfo.actions
                                            .map((a) => a.name)
                                            .includes(skill.name)
                                    ) {
                                        return newInfo.actions[
                                            newInfo.actions
                                                .map((a) => a.name)
                                                .indexOf(skill.name)
                                        ];
                                    } else {
                                        return skill;
                                    }
                                });
                                // .filter((skill) => {
                                //     return !newInfo.actions
                                //         .map((a) => a.name)
                                //         .includes(skill.name); //don't filter
                                // });
                            }
                        })
                        .filter((x) => x);
                })
                .flat(2)
                .concat(
                    newInfo.actions.filter(
                        (skill) =>
                            parseInt(newLevel) >=
                            parseInt(skill.levelUnlocked || "0")
                    )
                )
                .filter(
                    (value, index, array) => array.indexOf(value) === index
                );
            setNewInfo((old) => ({ ...old, level: newLevel, actions }));
        }
    };

    const getAttribute = (atr) => {
        return (
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
                      (newInfo.level - 1)
                : 0) +
            Math.floor(5 / info.level) * 5
        );
    };

    if (!info || !info.level || !newInfo || !newInfo.level) {
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
                        <FontAwesomeIcon
                            style={{ color: "black" }}
                            icon={faArrowLeft}
                        />
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <h3 style={{ margin: 0 }}>MAIN</h3>
                    <div
                        style={{
                            paddingLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <div>
                            <label
                                // style={{ display: "inline" }}
                                htmlFor="name"
                            >
                                Name:{" "}
                            </label>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setNewInfo((old) => ({
                                        ...old,
                                        ...{ name: e.target.value },
                                    }))
                                }
                                value={newInfo.name || ""}
                                id="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="level">Level: </label>
                            <input
                                type="number"
                                onChange={changeLevel}
                                value={newInfo.level || 1}
                                id="level"
                                min={1}
                                step={1}
                                max={120}
                            />
                        </div>
                        <div>
                            <label htmlFor="class">Class: </label>
                            {[1, 20, 40, 60, 80, 100, 120]
                                .slice(
                                    0,
                                    Math.ceil(
                                        (parseInt(newInfo.level) + 1) / 20
                                    )
                                )
                                .map((l, index) => {
                                    return (
                                        <select
                                            key={"classSelect" + String(l)}
                                            id={"class" + String(index)}
                                            level={String(l)}
                                            onChange={changeClass}
                                            value={
                                                newInfo.class[
                                                    [
                                                        1, 20, 40, 60, 80, 100,
                                                        120,
                                                    ].indexOf(l)
                                                ]
                                            }
                                        >
                                            <option value="none">--</option>
                                            {Object.keys(classes)
                                                .filter(
                                                    (c) =>
                                                        classes[
                                                            c
                                                        ].tier.toLowerCase() ===
                                                        {
                                                            1: "beginner",
                                                            20: "novice",
                                                            40: "adept",
                                                            60: "expert",
                                                            80: "elite",
                                                            100: "master",
                                                            120: "grandmaster",
                                                        }[l]
                                                )
                                                .map((c) => (
                                                    <option key={c} value={c}>
                                                        {classes[c].name}
                                                    </option>
                                                ))}
                                        </select>
                                    );
                                })}
                        </div>
                    </div>
                    <br />
                    <h3 style={{ margin: 0 }}>ATTRIBUTES</h3>
                    <div style={{ paddingLeft: 10 }}>
                        {Object.keys(info.attributes).map((atr) => {
                            return (
                                <div
                                    key={atr}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <label htmlFor={atr}>
                                            {atr.toUpperCase()}:{"  "}
                                        </label>
                                        <p
                                            style={{
                                                display: "inline",
                                                margin: 0,
                                                marginLeft: 5,
                                            }}
                                        >
                                            {newInfo.attributes
                                                ? newInfo.attributes[atr] +
                                                  getAttribute(atr)
                                                : 10}
                                        </p>
                                    </div>
                                    {newInfo.attributes ? (
                                        sum(
                                            Object.values(
                                                Object.keys(
                                                    info.attributes
                                                ).map(
                                                    (a) => newInfo.attributes[a]
                                                )
                                            )
                                        ) >=
                                        65 + (newInfo.level - 1) * 5 ? null : (
                                            <button
                                                style={{
                                                    padding: 0,
                                                    marginLeft: 5,
                                                }}
                                                id={atr}
                                                onClick={
                                                    attributeIncreaseClicked
                                                }
                                            >
                                                +
                                            </button>
                                        )
                                    ) : (
                                        <div />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <br />
                    <h3 style={{ margin: 0 }}>ACTIONS</h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            paddingLeft: 10,
                        }}
                    >
                        {newInfo.actions.map((s, pos) => (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                                key={String(pos) + " " + s.name}
                            >
                                <p style={{ margin: 0 }}>
                                    {s.name}(
                                    {s.name === "Unarmed Attack"
                                        ? "N/A"
                                        : s.skillLevel}
                                    )
                                </p>
                                {s.name === "Unarmed Attack" ? null : parseInt(
                                      newInfo.level
                                  ) -
                                      newInfo.actions
                                          .map((s) => s.skillLevel)
                                          .reduce((a, b) => a + b, 0) >
                                  0 ? (
                                    <button
                                        style={{ padding: 0, marginLeft: 5 }}
                                        id={String(pos)}
                                        onClick={actionIncreaseClicked}
                                    >
                                        +
                                    </button>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <button onClick={update}>UPDATE</button>
                </form>
            </div>
        </div>
    );
}
export default CharacterSettings;

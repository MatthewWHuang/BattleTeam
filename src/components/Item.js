import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import getClass, { getClasses } from "../api/ClassAPI";
import { extractNumber, sum } from "../helpers/TypeHelpers";

const TYPECOLOR = {
    fire: "orange",
    water: "darkblue",
    earth: "darkgray",
    air: "#dcadf5",
    poision: "#5dc55d",
    acid: "green",
    disease: "#8ad8ab",
    pure: "cyan",
    dark: "#351c75",
    light: "lightyellow",
    mana: "blue",
    hp: "red",
    sta: "#ffbc00",
};
const RARITYCOLOR = {
    common: "black",
    uncommon: "maroon",
    fine: "red",
    veryfine: "orange",
    extremelyfine: "yellow",
    rare: "green",
    veryrare: "skyblue",
    extremelyrare: "blue",
    epic: "darkblue",
    unique: "purple",
    epicunique: "pink",
    legendary: "gold",
};
function Item({ info, enabled, player, style, skillLevel }) {
    const [classInfo, setClassInfo] = useState();
    useEffect(() => {
        const getClassInfo = async () => {
            setClassInfo(
                await Promise.all(
                    Object.values(player.class).map(
                        async (c) => await getClass(c.toLowerCase())
                    )
                )
            );
        };
        getClassInfo();
    }, []);
    const getAttribute = (atr) => {
        return (
            player.attributes[atr] +
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
                      (player.level - 1)
                : 0) +
            Math.floor(player.level / 5) * 5
        );
    };

    if (!info || !info.name) {
        return null;
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottomStyle: "dashed",
                borderWidth: "thin",
                ...style,
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h4
                    style={{
                        margin: 0,
                        color: enabled
                            ? RARITYCOLOR[info.rarity || ""]
                            : "gray",
                        cursor: "pointer",
                        // title={info.description}
                    }}
                    data-tooltip-html={
                        info.description
                            ? info.description
                                  .split(" ")
                                  .reduce(
                                      (acc, val, idx) =>
                                          idx % 5 !== 0
                                              ? acc
                                                  ? `${acc} ${val}`
                                                  : `${val}`
                                              : `${acc}<br/>${val}`,
                                      ""
                                  )
                                  .slice(5)
                            : ""
                    }
                    // data-for={info.name + "-tooltip"}
                    data-tooltip-id={info.name + "-tooltip"}
                    // data-tooltip-content={
                    //     info.description
                    //         ? info.description
                    //               .split(/[\s,.]+/)
                    //               .reduce(
                    //                   (acc, val, idx) =>
                    //                       idx % 2 === 0
                    //                           ? acc
                    //                               ? `${acc} ${val}`
                    //                               : `${val}`
                    //                           : `${acc}<br/>${val}`,
                    //                   ""
                    //               )
                    //         : ""
                    // }
                    // data-tooltip-place="top"
                >
                    {info.name}
                </h4>
                <Tooltip
                    id={info.name + "-tooltip"}
                    multiline={true}
                    width="100px"
                />
                {/* <p>
                        {info.description
                            ? info.description
                                  .split(/[\s,.]+/)
                                  .reduce(
                                      (acc, val, idx) =>
                                          idx % 2 === 0
                                              ? acc
                                                  ? `${acc} ${val}`
                                                  : `${val}`
                                              : `${acc}<br/>${val}`,
                                      ""
                                  )
                            : ""}
                    </p> */}
                {/* </Tooltip> */}
                <h6
                    style={{
                        margin: 0,
                        color:
                            enabled > 0
                                ? RARITYCOLOR[info.rarity || ""]
                                : "gray",
                        cursor: "pointer",
                    }}
                >
                    <i>
                        {(
                            (info.tags
                                ? info.tags
                                      .filter(
                                          (tag) =>
                                              !["action, attack"].includes(tag)
                                      )
                                      .map(
                                          (tag) =>
                                              tag[0].toUpperCase() +
                                              tag.slice(1)
                                      )
                                : []) || []
                        )
                            .concat(
                                info.skillLevel ? null : info.rarity || "Common"
                            )
                            .join(", ")
                            .replace(/,\s*$/, "")}
                    </i>
                </h6>
            </div>
            {Object.keys(info).map((v) => {
                if (
                    [
                        "name",
                        "description",
                        "skillLevel",
                        "tags",
                        "skills",
                        "rarity",
                        "levelUnlocked",
                    ].includes(v)
                ) {
                    return null;
                }
                const val = info[v];
                const sl =
                    skillLevel || (info.skillLevel > 0 ? info.skillLevel : 1);
                return (
                    <h5
                        key={info.name + " " + v}
                        style={{
                            marginTop: 0,
                            marginBottom: 0,
                            marginRight: 0,
                            marginLeft: 10,
                            fontWeight:
                                { force: 800, piercing: "normal" }[val.type] ||
                                "bold",
                            color:
                                info.skillLevel > 0
                                    ? TYPECOLOR[
                                          (
                                              val.type ||
                                              val.rightType ||
                                              ""
                                          ).toLowerCase()
                                      ]
                                    : RARITYCOLOR[info.rarity || ""],
                        }}
                    >
                        {val.beginner || ""}
                        {eval(val.value) || ""}
                        {val.ender || ""} {val.type || ""} {v || ""}{" "}
                        {val.rightBeginner || ""}
                        {eval(val.rightValue) || ""}
                        {val.rightEnder || ""} {val.rightType || ""}
                    </h5>
                );
            })}
        </div>
    );
}

export default Item;

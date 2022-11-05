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
function Item({ info, enabled, player }) {
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
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4
          style={{
            margin: 0,
            color: enabled ? RARITYCOLOR[info.rarity || ""] : "gray",
            cursor: "pointer",
          }}
          title={info.description}
        >
          {info.name}
        </h4>
        <h6
          style={{
            margin: 0,
            color: enabled > 0 ? RARITYCOLOR[info.rarity || ""] : "gray",
            cursor: "pointer",
          }}
        >
          <i>{(info.tags || []).concat(info.rarity).join(", ")}</i>
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
          ].includes(v)
        ) {
          return null;
        }
        const val = info[v];
        const sl = info.skillLevel > 0 ? info.skillLevel : 1;
        return (
          <h5
            key={info.name + " " + v}
            style={{
              marginTop: 0,
              marginBottom: 0,
              marginRight: 0,
              marginLeft: 10,
              fontWeight:
                { force: 800, piercing: "normal" }[val.type] || "bold",
              color:
                info.skillLevel > 0
                  ? TYPECOLOR[(val.type || val.rightType || "").toLowerCase()]
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

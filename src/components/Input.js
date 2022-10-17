function Input({ style, color, value, change, max }) {
  return (
    <input
      style={{
        margin: 0,
        color: color || "black",
        height: 32,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        borderStyle: "none",
        backgroundColor: "transparent",
        ...style,
      }}
      value={isNaN(value) ? "" : value}
      onChange={(e) => {
        if (e.target.value == null || e.target.value === "") {
          change("", false);
        } else if (
          !isNaN(e.target.value.trim()) &&
          e.target.value >= 0 &&
          e.target.value <= max &&
          e.target.value % 1 == 0
        ) {
          change(e.target.value);
        }
      }}
      type="text"
    />
  );
}

export default Input;

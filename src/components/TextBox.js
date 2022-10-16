function TextBox({ children, backgroundColor, style }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor || "lightgoldenrodyellow",
        borderStyle: "solid",
        borderWidth: "0.1em",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default TextBox;

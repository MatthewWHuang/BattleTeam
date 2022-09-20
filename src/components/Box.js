import React from "react";

function Box({ style, children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderColor: "black",
        backgroundColor: "lightgray",
        // borderWidth: 10,
        borderStyle: "solid",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        alignSelf: "flex-start",
        marginBottom: 10,
        marginLeft: 10,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export default Box;

function BookNavigationLink({ children, to, indentation }) {
  return (
    <div
      style={{
        ...{
          width: 400,
          backgroundColor: `#${"fedcba9876543210"
            .charAt(indentation || 0)
            .repeat(3)}`,
          borderBottom: "1px dashed white",
        },
        ...(indentation === -1
          ? {
              borderBottomStyle: "solid",
              borderBottomWidth: "thin",
              borderBottomColor: "lightgrey",
            }
          : {}),
      }}
    >
      <a
        href={`#${to}`}
        style={{
          textDecoration: "initial",
          color: "black",
        }}
      >
        <p
          style={{
            fontSize: indentation === -1 ? "1.5em" : "1em",
            margin: 0,
            marginLeft: 20 + (Math.max(indentation, 0) || 0) * 20,
            fontWeight: indentation === -1 ? "bold" : "normal",
          }}
        >
          {children}
        </p>
      </a>
    </div>
  );
}

export default BookNavigationLink;

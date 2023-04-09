function Contains({ list }) {
  return (
    <ul>
      {list.map((i) => {
        if (typeof i === "object") {
          return <Contains list={i} />;
        } else {
          return <li>{i}</li>;
        }
      })}
    </ul>
  );
}

export default Contains;

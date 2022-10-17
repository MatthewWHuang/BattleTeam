import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getBooks from "../api/BooksAPI";

// const BOOKS = [
//   {
//     src: require("../images/BasicRulebookCover.png"),
//     alt: "Basic Rulebook",
//     name: "Basic Rulebook",
//     link: "basic-rules",
//   },
//   {
//     src: require("../images/TToAKaWTcover.png"),
//     alt: "Twev's Tome of Arcane Knowledge and War Tactics",
//     name: "Twev's Tome",
//     link: "twevs-tome",
//   },
// ];

function BooksList({ style, children }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const get = async () => {
      const booksValue = await getBooks();
      setBooks(booksValue);
    };
    get();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {Object.values(books).map((b) => {
        return (
          <div style={{ position: "relative", margin: 5 }}>
            <Link to={`/books/${b.link}`}>
              <img
                src={require(`../images/${b.src}.png`)}
                width={150}
                style={{
                  borderStyle: "solid",
                  borderWidth: "thin",
                  borderColor: "black",
                }}
                alt={b.alt}
              />
              <div
                style={{
                  display: "flex",
                  margin: 0,
                  position: "absolute",
                  bottom: "2%",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    width: 150,
                    height: 40,
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderStyle: "solid",
                    borderWidth: "thin",
                    borderColor: "black",
                  }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      height: "min-content",
                      margin: 0,
                      display: "flex",
                      color: "black",
                    }}
                  >
                    {b.name}
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default BooksList;

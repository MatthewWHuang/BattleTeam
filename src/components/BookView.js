import React, { useEffect, useState, useContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AuthContext } from "../context/Auth.context";
import { useParams } from "react-router-dom";
import { getBook } from "../api/BooksAPI";
import rulebook from "../images/basic-rules.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Book({ style, children }) {
    const { bookName } = useParams();
    const [book, setBook] = useState("loading");
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const { state } = useContext(AuthContext);

    useEffect(() => {
        const get = async () => {
            const bookValue = await getBook(bookName);
            console.log("book", bookValue);
            setBook(bookValue);
            // document.getElementById("book").innerHTML = bookValue.value;
        };
        get();
    }, []);

    useEffect(() => {
        document.title = book.name + " - Battle Team";
    }, [book]);

    if (book === "loading") {
        return (
            <div>
                <h1>Loading Book...</h1>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}
            id="book"
        >
            <button
                style={{
                    width: "10vw",
                    visibility: currentPage > 1 ? "visible" : "hidden",
                }}
                onClick={() => {
                    setCurrentPage(
                        currentPage > 1 ? currentPage - 2 : currentPage
                    );
                }}
            >
                {"<"}
            </button>
            <Document
                file={book}
                // file={book}
                // file={fetch(
                //     new URL(
                //         "https://drive.google.com/file/d/1H5qtaYzk3ngTzR3KufIhGMU0LB8MlZG6/preview"
                //     ),
                //     { mode: "no-cors" }
                // )
                //     // .then((blob) => blob.json())
                //     .then((data) => {
                //         console.log(data);
                //         return data;
                //     })
                //     .catch((e) => {
                //         console.log(e);
                //         return e;
                //     })}
                // onLoadError={console.error}
                // file={
                //     new URL(
                //         "http://localhost:3000/BattleTeam/static/media/rulebook.759f826edc2c5b816793.pdf"
                //     )
                // }
                // file={new URL("/BattleTeam/static/media/rulebook.759f826edc2c5b816793.pdf")}
                options={{ workerSrc: "pdf.worker.js" }}
                onLoadSuccess={({ numPages }) => {
                    setNumPages(numPages);
                    console.log("LOADED");
                }}
                loading={"Loading Book..."}
            >
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Page
                        pageNumber={currentPage}
                        height={600}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                    <Page
                        pageNumber={currentPage + 1}
                        height={600}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                </div>
            </Document>
            <button
                style={{
                    width: "10vw",
                    visibility:
                        currentPage < numPages - (numPages % 2) - 2
                            ? "visible"
                            : "hidden",
                }}
                onClick={() => {
                    console.log(">");
                    setCurrentPage(
                        currentPage < numPages - (numPages % 2) - 2
                            ? currentPage + 2
                            : currentPage
                    );
                }}
            >
                {">"}
            </button>
        </div>
    );
}
export default Book;

// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import CharacterSheet from "./components/CharacterSheet";
import CharacterCreate from "./components/CharacterCreate";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import firebaseConfig from "./FirebaseCreds";
import ErrorPage from "./components/ErrorPage";
import Root from "./components/Root";
import CharacterSettings from "./components/CharacterSettings";
import Login from "./components/Login";
import { ContextProvider } from "./context/Auth.context";
import Signup from "./components/Signup";
import CharacterList from "./components/CharacterList";
import BooksList from "./components/BooksList";
import Book from "./components/Book";
import BookView from "./components/BookView";
import Gameboard from "./components/Gameboard";

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Home />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "login",
                    element: <Login />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "signup",
                    element: <Signup />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "character/:characterID",
                    element: <CharacterSheet />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "create/character",
                    element: <CharacterCreate />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "character/:characterID/settings",
                    element: <CharacterSettings />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "list/characters",
                    element: <CharacterList />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "list/books",
                    element: <BooksList />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "books/:bookName",
                    element: <Book />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "books/:bookName/view",
                    element: <BookView />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "gameboard",
                    element: <Gameboard />,
                    errorElement: <ErrorPage />,
                },
            ],
        },
    ],
    {
        basename: "/BattleTeam",
    }
);

// const pages = {
//   Home: (
//     <Home info={character} db={db} inAdmin={inAdmin} setInAdmin={setInAdmin} />
//   ),
//   CharacterSheet: <CharacterSheet />,
// };

function App() {
    // const [page, setPage] = useState("Home");
    // const [globalVals, setGlobalVals] = useState({ inAdmin: false });
    // const [inAdmin, setInAdmin] = useState(false);
    // const [pageArgs, setPageArgs] = useState({});

    // const changeGlobalVals = (name, val) => {
    //   let override = {};
    //   override[name] = val;
    //   setGlobalVals((globalVals) => ({ ...globalVals, ...override }));
    // };

    useEffect(() => {
        document.title = "Battle Team";
    }, []);

    // const openPage = (page, args) => {
    //   setPage(page);
    //   setPageArgs(args);
    // };

    return (
        <div
            className="App"
            style={{ display: "flex", justifyContent: "center" }}
        >
            <ContextProvider>
                <RouterProvider router={router} />
                {/* {<{pages[page]} >} */}
            </ContextProvider>
        </div>
    );
}

export default App;

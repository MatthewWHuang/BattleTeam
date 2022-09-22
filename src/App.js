// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import CharacterSheet from "./components/CharacterSheet";
import CharacterCreate from "./components/CharacterCreate";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import firebaseConfig from "./FirebaseCreds";
import ErrorPage from "./components/ErrorPage";
import Root from "./components/Root";

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "character/:characterName",
        element: <CharacterSheet />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "create/character",
        element: <CharacterCreate />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

// const pages = {
//   Home: (
//     <Home info={character} db={db} inAdmin={inAdmin} setInAdmin={setInAdmin} />
//   ),
//   CharacterSheet: <CharacterSheet />,
// };

function App() {
  const [page, setPage] = useState("Home");
  const [globalVals, setGlobalVals] = useState({ inAdmin: false });
  // const [inAdmin, setInAdmin] = useState(false);
  const [pageArgs, setPageArgs] = useState({});

  const changeGlobalVals = (name, val) => {
    let override = {};
    override[name] = val;
    setGlobalVals((globalVals) => ({ ...globalVals, ...override }));
  };

  useEffect(() => {
    document.title = "Battle Team";
  }, []);

  const openPage = (page, args) => {
    setPage(page);
    setPageArgs(args);
  };

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <RouterProvider router={router} />
      {/* {<{pages[page]} >} */}
    </div>
  );
}

export default App;

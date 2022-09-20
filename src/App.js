import logo from "./logo.svg";
import "./App.css";
import CharacterSheet from "./components/CharacterSheet";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, ref, onValue } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBgwNGj3IxSyh5i6Y3fWUYAwQZMFpd7EnM",
  authDomain: "battleteam-2cc52.firebaseapp.com",
  databaseURL: "https://battleteam-2cc52-default-rtdb.firebaseio.com/",
  projectId: "battleteam-2cc52",
  storageBucket: "battleteam-2cc52.appspot.com",
  messagingSenderId: "121054961121",
  appId: "1:121054961121:web:e519008c0dee044bd046a0",
  measurementId: "G-QM8G16H8TH",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const db = getDatabase();

function App() {
  const [characterName, setCharacterName] = useState("");
  const [character, setCharacter] = useState("none");

  const loadCharacter = async (e) => {
    e.preventDefault();
    console.log(characterName);
    // const citiesCol = collection(db, "characters");
    // const citySnapshot = await getDocs(citiesCol);
    // const cityList = citySnapshot.docs.map((doc) => doc.data());
    // console.log(cityList);
    const characterRef = ref(db, "characters/" + characterName);
    onValue(characterRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setCharacter(data);
    });
  };
  const characterSelectChanged = (e) => {
    setCharacterName(e.target.value);
  };
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      {character != "none" ? (
        <CharacterSheet info={character} />
      ) : (
        <div>
          <label>Character </label>
          <input
            type="text"
            onChange={characterSelectChanged}
            value={characterName}
          ></input>
          <button onClick={loadCharacter}>GO</button>
        </div>
      )}
    </div>
  );
}

export default App;

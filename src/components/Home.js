import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import { Link } from "react-router-dom";

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

function Home({ openPage, globalVals, setGlobalVals }) {
  const [characterName, setCharacterName] = useState("");
  const loadCharacter = async (e) => {
    e.preventDefault();
    console.log(characterName);
    document.title =
      characterName.charAt(0).toUpperCase() +
      characterName.slice(1) +
      "'s Character Sheet - Battle Team";
    // const citiesCol = collection(db, "characters");
    // const citySnapshot = await getDocs(citiesCol);
    // const cityList = citySnapshot.docs.map((doc) => doc.data());
    // console.log(cityList);
    const characterRef = ref(db, "characters/" + characterName);
    onValue(characterRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      // setCharacter(data);
      openPage("CharacterSheet", { info: data });
    });
  };
  const characterSelectChanged = (e) => {
    setCharacterName(e.target.value);
  };

  const enterAdmin = (e) => {
    e.preventDefault();
    var pass = prompt(
      "Enter the correct password or you shall be sacrificed to our Dragon Cave..."
    );
    if (pass === "BT1vsSoop") {
      // setInAdmin(true);
      alert("You have entered Admin Mode!!!");
    } else {
      alert("INCORRECT!!! SACRAFICE THEM TO THE DRAGONS!!!");
    }
  };

  const createCharacter = () => {};
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flexDirection: "column" }}>
        <form>
          <label>Character </label>
          <input
            type="text"
            onChange={characterSelectChanged}
            value={characterName}
          ></input>
          {/* <button type="submit" onClick={loadCharacter}>
            GO
          </button> */}
          <Link to={"/character/" + characterName}>
            <button>GO</button>
          </Link>
        </form>
        <Link to={"/create/character/"}>
          <button onClick={createCharacter}>Create New Character</button>
        </Link>
        <button onClick={enterAdmin}>enter admin mode</button>
      </div>
      <div style={{ flexDirection: "column", borderStyle: "dashed" }}>
        <h3>COMING SOON!!!</h3>
        <img
          style={{ height: "80vh" }}
          alt="Twev's Tome of Arcane Knowledge and War Tactics"
          src={require("../images/TToAKaWTcover.png")}
        />
        <h3>Preorder(not) available now!</h3>
      </div>
    </div>
  );
}
export default Home;

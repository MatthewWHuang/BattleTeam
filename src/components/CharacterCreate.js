import { createNewCharacter } from "../api/CharacterAPI";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
function CharacterCreate({}) {
  //   const blankCharacter = useBlankCharacter();
  const [entered, setEntered] = useState(false);
  //   const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const { state } = useContext(AuthContext);

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const createCharacter = (e) => {
    e.preventDefault();
    setEntered(true);
  };
  useEffect(() => {
    if (entered) {
      console.log(state.username);
      createNewCharacter(name, state.username);
    }
  }, [entered]);
  useEffect(() => {
    document.title = "Create Character - Battle Team";
  });
  return (
    <div>
      <h1>Create Character</h1>
      {!entered ? (
        <form>
          <label>Name</label>
          <input
            placeholder="Character Name"
            value={name}
            onChange={nameChanged}
          ></input>
          <button onClick={createCharacter}>CREATE CHARACTER</button>
        </form>
      ) : (
        <Link to={"/character/" + name}>
          <button>Open Character</button>
        </Link>
      )}
    </div>
  );
}
export default CharacterCreate;

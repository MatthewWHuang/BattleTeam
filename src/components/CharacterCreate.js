import { createNewCharacter, getCharacters } from "../api/CharacterAPI";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
function CharacterCreate({}) {
  //   const blankCharacter = useBlankCharacter();
  const [entered, setEntered] = useState(false);
  //   const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const { state } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [creating, setCreating] = useState(false);
  const [characters, setCharacters] = useState([]);

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const createCharacter = (e) => {
    e.preventDefault();
    setEntered(true);
  };
  useEffect(() => {
    if (entered) {
      setCreating(true);
      const changeCharId = async () => {
        const newId = await createNewCharacter(name, state.username);
        setId(newId);
        setCreating(false);
      };
      changeCharId();
    }
  }, [entered]);
  useEffect(() => {
    document.title = "Create Character - Battle Team";
    const loadChars = async () => {
      const info = await getCharacters();
      setCharacters(info);
      console.log(Object.keys(info).length);
    };
    loadChars();
  });

  if (Object.keys(characters).length >= 3) {
    return (
      <div>
        <h2>
          You have reached your character limit. Delete a character to create
          another.
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Create Character</h1>
      {creating ? (
        <div>
          <h1>Creating Character...</h1>
        </div>
      ) : !entered ? (
        <form>
          <label>Name: </label>
          <input
            placeholder="Character Name"
            value={name}
            onChange={nameChanged}
            required
          ></input>
          <br />
          <button onClick={createCharacter} disabled={name === ""}>
            CREATE CHARACTER
          </button>
        </form>
      ) : (
        <Link to={"/character/" + id}>
          <button>Open Character</button>
        </Link>
      )}
    </div>
  );
}
export default CharacterCreate;

import { createNewCharacter, idsToInfo } from "../api/CharacterAPI";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { getCharacters } from "../api/AuthAPI";
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
      const ids = await getCharacters(state.username);
      const names = await idsToInfo(ids);
      var info = Object.keys(names).map((id) => {
        const idVal = names[id];
        return {
          id,
          ...idVal,
        };
      });
      setCharacters(info);
      console.log(Object.keys(info).length);
    };
    loadChars();
  });

  if (!state.admin && Object.keys(characters).length >= 8) {
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

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  update,
  get,
  child,
} from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import { useState, useEffect } from "react";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
function useCharacter(id) {
  const [info, setInfo] = useState({});
  const characterRef = ref(db, "characters/" + id);
  useEffect(() => {
    onValue(characterRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setInfo(data);
    });
  }, []);
  return info;
}
function useBlankCharacter() {
  const [info, setInfo] = useState({});
  const characterRef = ref(db, "blankCharacter");
  useEffect(() => {
    onValue(characterRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setInfo(data);
    });
  }, []);
  return info;
}
async function getCharacters() {
  // const [info, setInfo] = useEffect([]);
  // const listRef = ref(db, "characters");

  // onValue(
  //   listRef,
  //   (snapshot) => {
  //     const data = snapshot.val();
  //     var mapped = data.map((c) => c.name);
  //     // setInfo(mapped);
  //     return mapped;
  //   },
  //   {
  //     onlyOnce: true,
  //   }
  // );
  // return info;
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "characters"));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return [];
  }
  // onValue(
  //   usersRef,
  //   (snapshot) => {
  //     const data = snapshot.val();
  //     return data.password === pass;
  //   },
  //   { onlyOnce: true }
  // );
}
function createNewCharacter(name) {
  console.log("creating character...");
  // const [info, setInfo] = useState({});
  const characterRef = ref(db, "blankCharacter");
  // const [characters, setCharacters] = getCharacterNames();

  // useEffect(() => {}, [characters]);
  // const characterCount =
  //   characters !== null ? (characters.length + 1).toString() : "Loading";
  const charID = push(characterRef).key;

  // useEffect(() => {
  onValue(
    characterRef,
    (snapshot) => {
      // const characterRef = ref(db, "blankCharacter");
      // onValue(characterRef, (snapshot) => {
      //   const characterRef = ref(db, "blankCharacter");
      //   const data = snapshot.val();
      //   // console.log(data);
      //   // setInfo(data);
      //   // const listRef = ref(db, "characters");
      //   // const newListRef = push(listRef);
      //   data.name = name;
      //   const updates = {};
      //   updates[name] = data;
      //   update(ref(db, "characters"), updates);
      // });
      const data = snapshot.val();
      // console.log(data);
      // setInfo(data);
      // const listRef = ref(db, "characters");
      // const newListRef = push(listRef);
      data.name = name;
      const updates = {};
      updates[charID] = data;
      update(ref(db, "characters"), updates);
    },
    {
      onlyOnce: true,
    }
  );
  // }, []);

  // useEffect(() => {
  //   onValue(characterRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     setInfo(data);
  //   });
  // }, []);
  // return info;
}

function updateCharacter(id, info) {
  const characterRef = ref(db, "characters/" + id);
  set(characterRef, info);
  return true;
}

export default useCharacter;
export {
  useBlankCharacter,
  createNewCharacter,
  updateCharacter,
  getCharacters,
};

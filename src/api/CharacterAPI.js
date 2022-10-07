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
  remove,
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
async function createNewCharacter(name, username) {
  console.log("creating character...");
  // const [info, setInfo] = useState({});
  const characterRef = ref(db, "blankCharacter");
  // const [characters, setCharacters] = getCharacterNames();

  // useEffect(() => {}, [characters]);
  // const characterCount =
  //   characters !== null ? (characters.length + 1).toString() : "Loading";
  const charID = push(characterRef).key;

  const dbRef = ref(db);

  // useEffect(() => {

  const snapshot = await get(child(dbRef, `blankCharacter`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    // console.log(data);
    // setInfo(data);
    // const listRef = ref(db, "characters");
    // const newListRef = push(listRef);
    data.name = name;
    const updates = {};
    updates[charID] = data;
    update(ref(db, "characters"), updates);

    const accountSnapshot = await get(
      child(dbRef, `accounts/${username}/characters`)
    );
    if (accountSnapshot.exists()) {
      const listData = accountSnapshot.val();

      const accountRef = ref(db, `accounts/${username}/characters`);

      console.log("aaadata");
      console.log(listData);
      set(accountRef, listData === "none" ? [charID] : listData.concat(charID));
    }
    console.log("charID");
    console.log(charID);
    return charID;
  }
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

async function getCharacter(id) {
  const dbRef = ref(db);

  const snapshot = await get(child(dbRef, `characters/${id}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  }
}

async function deleteCharacter(id) {
  const characterRef = ref(db, "characters/" + id);
  remove(characterRef);
}

async function idsToInfo(ids) {
  const dbRef = ref(db);

  const names = {};
  console.log("ids");
  console.log(ids);
  for (let id of ids) {
    const snapshot = await get(child(dbRef, `characters/${id}`));
    console.log(id);
    if (snapshot.exists()) {
      console.log("s exists");
      const data = snapshot.val();
      console.log(data);
      names[id] = data;
    }
  }
  return names;
}

export default useCharacter;
export {
  useBlankCharacter,
  createNewCharacter,
  updateCharacter,
  getCharacters,
  getCharacter,
  idsToInfo,
  deleteCharacter,
};

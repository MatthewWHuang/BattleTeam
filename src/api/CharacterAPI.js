import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  update,
} from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import { useState, useEffect } from "react";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
function useCharacter(name) {
  const [info, setInfo] = useState({});
  const characterRef = ref(db, "characters/" + name);
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
function createNewCharacter(name, completed) {
  // const [info, setInfo] = useState({});
  const characterRef = ref(db, "blankCharacter");

  // useEffect(() => {
  onValue(characterRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    // setInfo(data);
    // const listRef = ref(db, "characters");
    // const newListRef = push(listRef);
    data.name = name;
    const updates = {};
    updates[name] = data;
    update(ref(db, "characters"), updates);
  });
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

export default useCharacter;
export { useBlankCharacter, createNewCharacter };

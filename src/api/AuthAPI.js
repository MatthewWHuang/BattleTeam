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
import { sha1, sha256, sha384, sha512 } from "crypto-hash";
import { faTurkishLiraSign } from "@fortawesome/free-solid-svg-icons";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
async function login(username, pass) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `accounts/${username}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    const hPass = await sha1(pass);
    if (hPass === data.password) {
      return ["success", data.admin];
    } else {
      return ["incorrect"];
    }
  } else {
    return ["error"];
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

async function signup(username, pass) {
  const accountRef = ref(db, `accounts/${username}`);
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `accounts`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    if (Object.keys(data).includes(username)) {
      return "usernametaken";
    } else {
      const hPass = await sha1(pass);
      set(accountRef, { characters: "none", password: hPass, admin: false });
      return "success";
    }
  } else {
    return "error";
  }

  //   const snapshot = await get(child(dbRef, `accounts/${username}`));

  //   if (snapshot.exists()) {
  //     const data = snapshot.val();
  //     const hPass = await sha1(pass);
  //     return hPass === data.password;
  //   } else {
  //     return false;
  //   }
  // onValue(
  //   usersRef,
  //   (snapshot) => {
  //     const data = snapshot.val();
  //     return data.password === pass;
  //   },
  //   { onlyOnce: true }
  // );
}

async function getCharacters(username) {
  //   const accountRef = ref(db, `accounts/${username}/characters`);
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `accounts/${username}/characters`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data === "none" ? [] : data;
  } else {
    return [];
  }
}

export default login;
export { signup, getCharacters };

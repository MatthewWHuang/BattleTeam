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

const app = initializeApp(firebaseConfig);
const db = getDatabase();
async function login(username, pass) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `accounts/${username}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    const hPass = await sha1(pass);
    return hPass === data.password;
  } else {
    return false;
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
  const hPass = await sha1(pass);
  set(accountRef, { password: hPass });
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

export default login;
export { signup };

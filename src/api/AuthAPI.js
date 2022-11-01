// import { initializeApp } from "firebase/app";
// import {
//   getDatabase,
//   ref,
//   onValue,
//   push,
//   set,
//   update,
//   get,
//   child,
//   remove,
// } from "firebase/database";
// import firebaseConfig from "../FirebaseCreds";
// import { useState, useEffect } from "react";
import { sha1, sha256, sha384, sha512 } from "crypto-hash";
import { get, del, set } from "./FirebaseAPI";

// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
async function login(username, pass) {
  const data = await get(`accounts/${username}`);
  if (data === null) {
    return ["error"];
  }
  const hPass = await sha1(pass);
  if (hPass === data.password) {
    return ["success", data.admin];
  } else {
    return ["incorrect"];
  }
}

async function signup(username, pass) {
  const data = await get(`accounts`);
  if (data === null) {
    return ["error"];
  }
  if (Object.keys(data).includes(username)) {
    return "usernametaken";
  } else {
    const hPass = await sha1(pass);
    set(`accounts/${username}`, {
      characters: "none",
      password: hPass,
      admin: false,
    });
    return "success";
  }
}

async function getCharacters(username) {
  const data = await get(`accounts/${username}/characters`);
  if (data === null) {
    return [];
  }
  return data;
}

async function removeCharacterFromAccount(username, id) {
  const index = (await getCharacters(username)).findIndex((c) => c === id);
  console.log("length", (await get(`accounts/${username}/characters`)).length);

  if ((await get(`accounts/${username}/characters`)).length === 1) {
    set(`accounts/${username}/characters/`, "none");
  } else {
    del(`accounts/${username}/characters/${index}`);
  }
}

export default login;
export { signup, getCharacters, removeCharacterFromAccount };

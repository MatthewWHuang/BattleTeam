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
            books: "none",
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

async function getBookAccess(username) {
    const data = await get(`accounts/${username}/books`);
    if (data === null) {
        return "none";
    }
    return data;
}

async function removeCharacterFromAccount(username, id) {
    const characters = await getCharacters(username);
    const index = characters.findIndex((c) => c === id);
    console.log(
        "length",
        (await get(`accounts/${username}/characters`)).length
    );

    if ((await get(`accounts/${username}/characters`)).length === 1) {
        set(`accounts/${username}/characters/`, "none");
    } else {
        set(
            `accounts/${username}/characters/`,
            Object.values(characters).filter((char) => char !== id)
        );
        // del(`accounts/${username}/characters/${index}`);
    }
}

export default login;
export { signup, getCharacters, removeCharacterFromAccount, getBookAccess };

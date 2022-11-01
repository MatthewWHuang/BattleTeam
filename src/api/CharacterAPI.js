import { push } from "firebase/database";
import { del, get, listen, set, update, getKey } from "./FirebaseAPI";
import { useEffect, useState } from "react";

function useCharacter(id) {
  const [info, setInfo] = useState({});
  useEffect(() => {
    listen(`characters/${id}`, (data) => {
      setInfo(data);
    });
  }, []);
  return info;
}

async function createNewCharacter(name, username) {
  const blankCharacter = await get("blankCharacter");

  const charID = getKey("blankCharacter");

  let newCharacter = { ...blankCharacter };
  newCharacter.name = name;
  newCharacter.owner = username;
  const updates = {};
  updates[charID] = newCharacter;
  update("characters", updates);

  const listData = await get(`accounts/${username}/characters`);

  set(
    `accounts/${username}/characters`,
    listData === "none" ? [charID] : listData.concat(charID)
  );

  return charID;
}

function updateCharacter(id, info) {
  set(`characters/${id}`, info);
}

async function getCharacter(id) {
  return await get(`characters/${id}`);
}

async function deleteCharacter(id) {
  del(`characters/${id}`);
}

async function idsToInfo(ids) {
  const names = {};
  for (let id of ids) {
    names[id] = await get(`characters/${id}`);
  }
  return names;
}

export default useCharacter;
export {
  createNewCharacter,
  updateCharacter,
  getCharacter,
  idsToInfo,
  deleteCharacter,
};

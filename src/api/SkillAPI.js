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

const app = initializeApp(firebaseConfig);
const db = getDatabase();

async function getBaseSkill(skill) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `baseSkills/${skill}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return {};
  }
}

export default getBaseSkill;

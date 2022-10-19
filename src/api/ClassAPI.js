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

async function getClass(cls) {
  //   const accountRef = ref(db, `accounts/${username}/characters`);
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `classes/${cls}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return {};
  }
}

async function getClasses() {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `classes`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return [];
  }
}

export default getClass;
export { getClasses };

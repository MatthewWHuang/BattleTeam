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

async function getBooks() {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `books`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return [];
  }
}

async function getBook(book) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `books/${book}`));

  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return `No Such Book ${book} Exists`;
  }
}

export default getBooks;
export { getBook };

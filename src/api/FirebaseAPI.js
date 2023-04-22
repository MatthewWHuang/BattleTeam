import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    onValue,
    set as setDB,
    update as updateDB,
    get as getDB,
    child,
    remove as removeDB,
    push,
} from "firebase/database";
import firebaseConfig from "../FirebaseCreds";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);
const storage = getStorage(app);

async function get(path) {
    const snapshot = await getDB(child(dbRef, path));

    if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
    }
}

async function set(path, value) {
    const dataRef = ref(db, path);

    setDB(dataRef, value);
}

async function del(path) {
    const dataRef = ref(db, path);

    removeDB(dataRef);
}

async function update(path, updates) {
    const dataRef = ref(db, path);

    updateDB(dataRef, updates);
}

async function listen(path, callback) {
    const dataRef = ref(db, path);

    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

function getKey(path) {
    const dataRef = ref(db, path);

    return push(dataRef).key;
}

export { get, set, del, update, listen, getKey, storage };

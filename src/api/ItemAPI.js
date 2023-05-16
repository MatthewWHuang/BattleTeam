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

async function getItemNames(item) {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `items`));

    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data);
    } else {
        return {};
    }
}

async function getItem(item) {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `items/${item}`));

    if (snapshot.exists()) {
        const data = snapshot.val();
        data.name = item;
        return data;
    } else {
        return {};
    }
}

export default getItemNames;
export { getItem };

import { getBlob, getDownloadURL, ref } from "firebase/storage";
import { get, storage } from "./FirebaseAPI";

async function getBooks() {
    return await get("books");
}

async function getBookInfo(book) {
    return await get(`books/${book}`);
}

async function getBook(book) {
    const storageRef = ref(storage, `${book}.pdf`);
    const blob = await getBlob(storageRef);
    return blob;
}

export default getBooks;
export { getBook, getBookInfo };

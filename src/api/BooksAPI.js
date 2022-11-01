import { get } from "./FirebaseAPI";

async function getBooks() {
  return await get("books");
}

async function getBook(book) {
  return await get(`books/${book}`);
}

export default getBooks;
export { getBook };

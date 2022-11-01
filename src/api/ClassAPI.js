import { get } from "./FirebaseAPI";

async function getClass(cls) {
  return await get(`classes/${cls}`);
}

async function getClasses() {
  return await get(`classes`);
}

export default getClass;
export { getClasses };

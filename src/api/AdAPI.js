import { get } from "./FirebaseAPI";

async function getAd() {
  const data = await get("/ads/0");
  return data;
}

export { getAd };

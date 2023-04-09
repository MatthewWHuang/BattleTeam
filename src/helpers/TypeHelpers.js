import merge from "lodash.merge";
function mergeObjects(object1, ...objects) {
  return merge(...[object1, objects]);
}

function extractNumber(str) {
  return str
    .split("")
    .filter((v) => !isNaN(v))
    .join("");
}

function sum(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

export { mergeObjects, extractNumber, sum };

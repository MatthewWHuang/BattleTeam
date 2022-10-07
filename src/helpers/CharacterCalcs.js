function getExpForLevel(lvl) {
  var exp = 100;
  var currentIncrease = 150;
  for (let i = 1; i < lvl; i++) {
    exp += currentIncrease;
    currentIncrease += 100;
  }
  return exp;
}
function getExpTotalsToLevel(lvl) {
  var exp = 0;
  for (let i = 1; i <= lvl; i++) {
    exp += getExpForLevel(i);
  }
  return exp;
}
export { getExpForLevel, getExpTotalsToLevel };

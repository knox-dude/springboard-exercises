// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {

  function buildDict(numba) {
    str = numba.toString();
    let obj = {}
    for (let i of str) {
      obj[i] ? obj[i]++ : obj[i] = 1
    }
    return obj
  }

  let obj1 = buildDict(num1);
  let obj2 = buildDict(num2);

  return JSON.stringify(obj1) == JSON.stringify(obj2);
}

module.exports = sameFrequency
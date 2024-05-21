// add whatever parameters you deem necessary
function constructNote(msg, letters) {
  // make dict from letters
  dict = {}
  for (let letter of letters) {
    dict[letter] ? dict[letter]++ : dict[letter] = 1
  }
  for (let c of msg) {
    if (dict[c]) {
      dict[c]--;
    } else {
      return false
    }
  }
  return true
}

module.exports = constructNote
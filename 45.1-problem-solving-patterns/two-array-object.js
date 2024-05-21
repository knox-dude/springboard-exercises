// add whatever parameters you deem necessary
function twoArrayObject(keys, vals) {
  ans = {}
  for (let i = 0; i < keys.length; i++) {
    if (i >= vals.length) {
      ans[keys[i]] = null;
    } else {
      ans[keys[i]] = vals[i];
    }
  }

  return ans
}

module.exports = twoArrayObject
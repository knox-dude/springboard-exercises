// add whatever parameters you deem necessary
function countPairs(nums, target) {
  let s = new Set()
  let ans = 0;
  for (let num of nums) {
    if (s.has(num)) {
      ans++;
    } else {
      s.add(target-num)
    }
  }
  return ans
}

module.exports = countPairs;
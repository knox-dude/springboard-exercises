// add whatever parameters you deem necessary
function averagePair(nums, target) {
  let s = new Set()
  for (let num of nums) {
    if (s.has(num)) return true
    s.add((target*2)-num)
  }
  return false
}

module.exports = averagePair
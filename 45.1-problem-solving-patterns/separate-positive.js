// add whatever parameters you deem necessary
function separatePositive(nums) {
  let l = 0, r = nums.length-1;
  while (l < r) {
    if (nums[l] < 0 && nums[r] > 0) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++; r--;
    } else if (nums[l] < 0) {
      r--;
    } else {
      l++;
    }
  }
  return nums;
}

module.exports = separatePositive
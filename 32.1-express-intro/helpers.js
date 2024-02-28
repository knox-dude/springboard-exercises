function checkEmpty(nums) {
  if (nums.length === 0) {
    return true;
  }
  return false;
}

function checkNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i])) {
      return {"isNum":false, "problem":nums[i]};
    }
  }
  return {"isNum":true};
}

module.exports = {checkEmpty, checkNumber}
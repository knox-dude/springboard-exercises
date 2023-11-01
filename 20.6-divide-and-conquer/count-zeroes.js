function countZeroes(arr) {
  let left = 0;
  let right = arr.length-1;
  let mid = -1;

  while (right-left > 1) {
    mid = Math.floor((right-left)/2) + left;
    if (arr[mid] == 0) right = mid;
    if (arr[mid] == 1) left = mid;
  }

  if (arr[left] == 0) {
    return arr.length-left
  }
  else if (arr[right] == 0 && arr[left] == 1) {
    return arr.length-right
  }
  else if (arr[right] == 1) {
    return 0
  }

}

module.exports = countZeroes
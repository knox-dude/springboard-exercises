/**
 * 
 * ## **sortedFrequency**

  Given a sorted array and a number, write a function called
  sortedFrequency that counts the occurrences of the number in the array
  If that number isn't found, return -1

**Constraints**:

Time Complexity: O(log N)
 */

function sortedFrequency(arr, value) {
  let left = 0;
  let right = arr.length-1;
  let mid = -1;

  while (right-left > 1) {
    mid = Math.floor((right-left)/2) + left;

    if (arr[mid] < value) left = mid;

    else if (arr[mid] > value) right = mid;

    else if (arr[mid] == value) {
      let leftMid = mid, rightMid = mid;
      while (arr[leftMid] == value) {
        leftMid--
      }
      while (arr[rightMid] == value) {
        rightMid++
      }
      return rightMid - leftMid - 1;
    }
  }
  if (arr[left] > value || arr[right] < value) return -1;
  if (arr[left] == value && arr[right] > value) return 1;
  if (arr[right] == value && arr[left] < value) return 1;
}

module.exports = sortedFrequency
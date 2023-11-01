/**
 * ## **findRotationCount**

Write a function called ***findRotationCount*** which accepts an array of distinct numbers
 sorted in increasing order. The array has been rotated counter-clockwise n number of times.
 Given such an array, find the value of n.

**Constraints**:

Time Complexity: O(log N)

Examples:

findRotationCount([15, 18, 2, 3, 6, 12]) // 2
findRotationCount([7, 9, 11, 12, 5]) // 4
findRotationCount([7, 9, 11, 12, 15]) // 0



 */


function findRotationCount(arr) {
  return findPivot(arr, 0, arr.length-1)
}

function findPivot(arr, left=0, right=arr.length-1) {

  if (right-left <= 1) {
    console.log("implement base case");
  }
  let mid = Math.floor((right-left)/2) + left
  if (arr[mid+1] < arr[mid]) {
    return mid+1
  }
  if (arr[mid] > arr[right] && arr[mid] > arr[left]) {
    return findPivot(arr, mid, right);
  }
  else if (arr[mid] < arr[right] && arr[mid] < arr[left]) {
    return findPivot(arr, left, mid);
  }
  else {
    return 0 //couldn't find pivot
  }
}

module.exports = findRotationCount
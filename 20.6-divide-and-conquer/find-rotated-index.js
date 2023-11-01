/**
 * Write a function called ***findRotatedIndex*** which accepts a rotated array
 *  of sorted numbers and an integer. The function should return the index of num
 *  in the array. If the value is not found, return -1.

**Constraints**:

Time Complexity: O(log N)

Examples:

findRotatedIndex([3,4,1,2],4) // 1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
if it was 2:
  take left = mid cuz its < left and < right
if it was 8:
  take right = mid cut its > left and > right

if val < left and val < right:
  left = mid
if val > left and val > right:
  right = mid
if val < left and val > right:
  entered normal binSearch, use mid
if val > left and val < right
  not in list

findRotatedIndex([9, 1, 2, 3, 4, 5, 6, 7, 8], 3) // 4
findRotatedIndex([4, 5, 6, 7, 8, 9, 1, 2, 3], 2) // 7
findRotatedIndex([2, 3, 4, 5, 6, 7, 8, 9, 1], 3) // 1
this breaks above logic. So different try:

1. Find pivot index
2. Call binary search on the array that we want

findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
findRotatedIndex([37,44,66,102,10,22],14) // -1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
 */



/**
 * Returns the index of val in arr
 * 
 * @param {Array} arr 
 * @param {number} val 
 */

function findRotatedIndex(arr, val) {
  let left=0, right=0, mid=-1
  let pivot = findPivot(arr)
  console.log()
  // if (arr[pivot] < )
  return 1

}

function findPivot(arr, left=0, right=arr.length-1) {

  if (right-left <= 1) {
    console.log("implement base case");
  }
  let mid = Math.floor((right-left)/2)
  if (arr[mid+1] < arr[mid]) {
    return mid+1
  }
  if (arr[mid] > arr[right] && arr[mid] > arr[left]) {
    return findPivot(arr, left+mid, right);
  }
  else if (arr[mid] < arr[right] && arr[mid] < arr[left]) {
    return findPivot(arr, left, right-mid);
  }
  else {
    console.log("uhhhhhh...");
  }


}

module.exports = findRotatedIndex
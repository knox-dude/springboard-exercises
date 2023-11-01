/**
 * ## **findFloor**

Write a function called ***findFloor*** which accepts a sorted array and a value x,
 and returns the floor of x in the array. The floor of x in an array is the largest
 element in the array which is smaller than or equal to x. If the floor does not exist, return -1.

Examples:

findFloor([1,2,8,10,10,12,19], 9) // 8
findFloor([1,2,8,10,10,12,19], 20) // 19
findFloor([1,2,8,10,10,12,19], 0) // -1

 */


function findFloor(arr, val) {
  return binarySearch(arr, val)
}

function binarySearch(arr, val, left=0, right=arr.length-1) {
  if (right-left <= 1) {
    if (arr[left] == val || arr[right] == val) return val;
    if (arr[left] > val) return -1;
    if (arr[left] < val && arr[right] > val) return arr[left];
    if (arr[left] < val && arr[right] < val) return arr[right];
    
    return arr[left]===val ? left : right
  } 

  let mid = Math.floor((right-left)/2) + left
  if (arr[mid] == val) return mid;
  if (arr[mid] < val) return binarySearch(arr, val, mid, right)
  if (arr[mid] > val) return binarySearch(arr, val, left, mid)
}

module.exports = findFloor
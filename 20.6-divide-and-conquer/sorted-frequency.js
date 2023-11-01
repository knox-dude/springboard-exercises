/**
 * 
 * ## **sortedFrequency**

  Given a sorted array and a number, write a function called
  sortedFrequency that counts the occurrences of the number in the array
  If that number isn't found, return -1

**Constraints**:

Time Complexity: O(log N)

Examples:

sortedFrequency([1,1,2,2,2,2,3],2) // 4
sortedFrequency([1,1,2,2,2,2,3],3) // 1
sortedFrequency([1,1,2,2,2,2,3],1) // 2
sortedFrequency([1,1,2,2,2,2,3],4) // -1

adding my own test cases:
sortedFrequency([1,1,2,2,2,5,5,10,10,10],6) // -1
sortedFrequency([1,1,2,2,2,5,5,10,10,10],2) // 3
sortedFrequency([1,1,2,2,2,5,5,10,10,10],10) // 3
 */

function sortedFrequency(arr, val, left=0, right=arr.length-1) {
  if (val < arr[left] || val > arr[right]) return -1
  let high = findHigh(arr, val)
  let low = findLow(arr, val)
  if (high == low && arr[low] != val) return -1
  return high - low + 1
}

function findLow(arr, val, left=0, right=arr.length-1) {
  if (right == left) return left
  if (right-left == 1) {
    console.log()
  }
  let mid = Math.floor((right-left)/2) + left
  if (arr[mid] == val && arr[mid-1] < val) return mid
  if (arr[mid] < val) return findLow(arr, val, mid+1,right)
  if (arr[mid] >= val) return findLow(arr, val, left, mid-1)
}

function findHigh(arr, val, left=0, right=arr.length-1) {
  if (right == left) return right
  if (right-left == 1) {
    console.log()
  }
  let mid = Math.floor((right-left)/2) + left
  if (arr[mid] == val && arr[mid+1] > val) return mid
  if (arr[mid] <= val) return findHigh(arr, val, mid+1,right)
  if (arr[mid] > val) return findHigh(arr, val, left, mid-1)
}

module.exports = sortedFrequency
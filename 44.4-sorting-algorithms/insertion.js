function insertionSort(arr=[]) {
  if (arr.length === 0) return arr;
  
  for (let i = arr.length; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[j-1]) {
        [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
      }
    }
  }
  return arr;
}

module.exports = insertionSort;
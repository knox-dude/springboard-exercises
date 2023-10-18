/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start=0, end=arr.length-1){
  if (arr.length === 0) return 0;

  let pivot = arr[start], k=end;

  for (let i = end; i > start; i--) {
    if (arr[i] > pivot){
      [arr[i], arr[k]] = [arr[k], arr[i]];
      k--;
    }
  }

  [arr[start], arr[k]] = [arr[k], arr[start]]

  return k;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left=0, right=arr.length-1) {

  if (left < right) {
    let pi = pivot(arr, left, right);
    quickSort(arr, left, pi - 1);  // Before pi
    quickSort(arr, pi + 1, right); // After pi
  }
  return arr;
}

module.exports = {pivot, quickSort};
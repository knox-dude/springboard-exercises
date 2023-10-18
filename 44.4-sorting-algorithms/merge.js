function merge(arr1, arr2, final=[]) {
  let p1 = 0, p2 = 0;

  while (p1 < arr1.length && p2 < arr2.length) {
    arr1[p1] < arr2[p2] ? pushP1() : pushP2();
  }
  while (p1 < arr1.length) {
    pushP1();
  }
  while (p2 < arr2.length) {
    pushP2();
  }

  function pushP1() {
    final.push(arr1[p1]);
    p1++;
  }
  
  function pushP2() {
    final.push(arr2[p2]);
    p2++;
  }

  return final;
}

function mergeSort(arr=[]) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length/2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid))
  return merge(left, right);
}

module.exports = { merge, mergeSort};
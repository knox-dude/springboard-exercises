/** Returns the digit-th digit of num
 * 
 *  (12345, 0) -> 5
 *  (12345, 2) -> 3
 */

function getDigit(num, digit) {
  num = Math.abs(num);
  while (digit > 0) {
    num = Math.floor(num/10);
    digit--;
  }
  return num % 10;
}

/** Returns the number of digits in num */

function digitCount(num) {
  num = Math.abs(num);
  let count = 1;
  while (num > 9) {
    num = Math.floor(num/10);
    count += 1;
  }
  return count;
}

/** Returns the max number of digits from elements in nums */

function mostDigits(nums) {
  if (nums.length === 0) return 0;

  const digitCounts = nums.map(x => digitCount(x));
  return Math.max(...digitCounts);
}

/** Performs radix sort */

function radixSort(nums) {
  // Find the maximum number of digits in the array
  const maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    // Create 10 buckets (0-9)
    let buckets = [ [], [], [], [], [], [], [], [], [], [] ]

    for (let num of nums) {
      // Get the k-th digit from the right
      const digit = getDigit(num, k)

      // Place the number in the corresponding bucket
      buckets[digit].push(num)
    }
    // Reconstruct the array by concatenating the buckets
    nums = [];
    for (let bucket of buckets) {
      nums.push(...bucket)
    }
  }

  return nums
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };
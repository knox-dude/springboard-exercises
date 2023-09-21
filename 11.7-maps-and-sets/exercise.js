// ## **hasDuplicate**

// Write a function called hasDuplicate which accepts an array and returns true
// or false if that array contains a duplicate
const hasDuplicate = (arr) => {
    const set = new Set(arr);
    return set.size === arr.length ? false : true;
}

//## **vowelCount**

// Write a function called vowelCount which accepts a string and returns a map
// where the keys are numbers and the values are the count of the vowels in the string.
const vowelCount = (str) => {
    const vowels = new Set('aeiou');
    let vowelMap = new Map();
    str
        .toLowerCase()
        .split('')
        .forEach((val) => {
            if (vowels.has(val)) { // If current letter (val) is a vowel...
                if (vowelMap.has(val)) { 
                    vowelMap.set(val, vowelMap.get(val)+1);
                } else {
                    vowelMap.set(val, 1);
                }
            }
        })
    return vowelMap;
}
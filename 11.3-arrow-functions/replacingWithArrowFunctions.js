
function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}

// replace the above code to use two arrow functions. Turn it into a one-liner.
const doubleWithArrows = arr => arr.map(val=>val*2);

// Replace ALL functions with arrow functions:

function squareAndFindEvens(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
}

const squareAndFindEvensWithArrows = numbers => {
  return numbers.map(num => num**2).filter(square => square % 2 === 0);
}
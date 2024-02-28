const {checkEmpty, checkNumber} = require("./helpers.js")

describe("checkEmpty", () => {
  it("should check if an array is empty", () => {
    expect(checkEmpty([])).toBe(true);
    expect(checkEmpty([1, 2, 3])).toBe(false);
  });
});

describe("checkNumber", () => {
  it("should check if all elements in nums can be converted to numbers", () => {
    expect(checkNumber([1, 2, 3])).toEqual({"isNum":true});
    expect(checkNumber(["1", "foo", "3"])).toEqual({"isNum":false, "problem":"foo"});
    expect(checkNumber(["1", "2", "3"])).toEqual({"isNum":true});
    expect(checkNumber([1, "2", "3", "hello"])).toEqual({"isNum":false, "problem":"hello"});
  });
});
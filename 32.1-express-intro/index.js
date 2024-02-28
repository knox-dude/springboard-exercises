const express = require("express");

const app = express();

function checkEmpty(nums) {
  if (nums.length === 0) {
    return true;
  }
  return false;
}

function checkNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i])) {
      return {"isNum":false, "problem":nums[i]};
    }
  }
  return {"isNum":true};
}

app.get("/mean/:nums", (req, res) => {
  const nums = req.params.nums;
  const onlyNums = nums.split("=")[1]; // remove the 'nums=' part

  //error handling to check if numbers are present
  if (checkEmpty(onlyNums)) {
    return res.status(400).send({
      "error": "nums are required"
    });
  }

  const split = onlyNums.split(",");

  // error handling to check if all numbers are numbers
  const {isNum, problem} = checkNumber(split); 
  if (!isNum) {
    return res.status(400).send({
      "error": `${problem} is not a number`
    });
  }

  const mapped = split.map(Number);
  const sum = mapped.reduce((a, b) => a + b);

  const response = {
    "response": {
      "operation": "mean",
      value: sum / split.length
    }
  }

  res.send(200, response);
});

app.get("/median/:nums", (req, res) => {
  const nums = req.params.nums;
  const onlyNums = nums.split("=")[1]; // remove the 'nums=' part

  //error handling to check if numbers are present
  if (checkEmpty(onlyNums)) {
    return res.status(400).send({
      "error": "nums are required"
    });
  }

  const split = onlyNums.split(",");

  // error handling to check if all numbers are numbers
  const {isNum, problem} = checkNumber(split); 
  if (!isNum) {
    return res.status(400).send({
      "error": `${problem} is not a number`
    });
  }

  const mapped = split.map(Number);
  const sorted = mapped.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  let value;

  if (sorted.length % 2 === 0) {
    value = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    value = sorted[mid];
  }

  const response = {
    "response": {
      "operation": "median",
      value: value
    }
  }

  res.send(200, response);
});

app.get("/mode/:nums", (req, res) => {
  const nums = req.params.nums;
  const onlyNums = nums.split("=")[1]; // remove the 'nums=' part

  //error handling to check if numbers are present
  if (checkEmpty(onlyNums)) {
    return res.status(400).send({
      "error": "nums are required"
    });
  }

  const split = onlyNums.split(",");

  // error handling to check if all numbers are numbers
  const {isNum, problem} = checkNumber(split); 
  if (!isNum) {
    return res.status(400).send({
      "error": `${problem} is not a number`
    });
  }

  const mapped = split.map(Number);
  const sorted = mapped.sort((a, b) => a - b);
  const counts = {};

  for (let num of sorted) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  let max = 0;
  let value;
  for (let key in counts) {
    if (counts[key] > max) {
      max = counts[key];
      value = key;
    }
  }

  const response = {
    "response": {
      "operation": "mode",
      value: value
    }
  }
  res.send(200, response);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Press Ctrl+C to stop");
});


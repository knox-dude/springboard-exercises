beforeEach(function()  {
});

it('should calculate the monthly rate correctly', function () {
  const testValues = {
    amount: 100,
    years: 1,
    rate: 0.1,
  }
  expect(calculateMonthlyPayment(testValues)).toEqual('8.79');
});


it("should return a result with 2 decimal places", function() {
  const testValues = {
    amount: 2000,
    years: 2,
    rate: 0.9679,
  }
  expect(calculateMonthlyPayment(testValues)).toEqual('191.00');
});

/// etc

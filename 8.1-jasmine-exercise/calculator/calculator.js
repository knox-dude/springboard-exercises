window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let currents = getCurrentUIValues();
  currents.amount = currents.amount < 0 ? 1 : currents.years;
  currents.years = currents.years <= 0 ? 1 : currents.years;
  currents.rate = currents.rate <= 0 ? 0.01 : currents.rate;
  const monthlyPayment = calculateMonthlyPayment(currents);
  updateMonthly(monthlyPayment);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let currents = getCurrentUIValues()
  console.log(currents);
  const monthlyPayment = calculateMonthlyPayment(currents);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  // if (values.amount <= 0) return "No loan found!"
  const p = values.amount;
  const i = values.rate / 12;
  const n = values.years * 12;
  
  const equationResult = ((p*i)/(1-Math.pow(1+i,-1*n)))
  return equationResult.toFixed(2).toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  paymentDiv = document.querySelector('#monthly-payment');
  paymentDiv.innerText = monthly;
}

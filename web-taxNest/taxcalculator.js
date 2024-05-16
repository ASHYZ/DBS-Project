document.getElementById('taxCalculatorForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form inputs
  const ageCategory = document.getElementById('ageCategory').value;
  const grossSalary = parseFloat(document.getElementById('grossSalary').value) || 0;
  const otherIncome = parseFloat(document.getElementById('otherIncome').value) || 0;
  const investment80C = parseFloat(document.getElementById('investment80C').value) || 0;
  const medicalInsurance = parseFloat(document.getElementById('medicalInsurance').value) || 0;
  const charityDonation = parseFloat(document.getElementById('charityDonation').value) || 0;
  const educationLoan = parseFloat(document.getElementById('educationLoan').value) || 0;
  const savingsInterest = parseFloat(document.getElementById('savingsInterest').value) || 0;
  const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
  const dearnessAllowance = parseFloat(document.getElementById('dearnessAllowance').value) || 0;
  const hraReceived = parseFloat(document.getElementById('hraReceived').value) || 0;
  const totalRentPaid = parseFloat(document.getElementById('totalRentPaid').value) || 0;
  const metroCity = document.getElementById('metroCity').value;
  

  // Calculate tax
  const tax = calculateTax(ageCategory, grossSalary, otherIncome, investment80C, medicalInsurance, charityDonation, educationLoan, savingsInterest, basicSalary, dearnessAllowance, hraReceived, totalRentPaid, metroCity);

  // Display result
  const resultElement = document.getElementById('result');
  resultElement.textContent = `Tax Payable: ₹${tax.toFixed(2)}`;
});

function calculateTax( ageCategory, grossSalary, otherIncome, investment80C, medicalInsurance, charityDonation, educationLoan, savingsInterest, basicSalary, dearnessAllowance, hraReceived, totalRentPaid, metroCity) {
  // Define tax slabs and rates
  const applicableBrackets = TAX_BRACKETS[ageCategory] || TAX_BRACKETS['below60']; // Default to 'below60' if ageCategory is not defined
  const TAX_BRACKETS = {

    'below60': [
        { upperBound: 250000, rate: 0 },
        { upperBound: 500000, rate: 0.05 },
        { upperBound: 750000, rate: 0.1 },
        { upperBound: 1000000, rate: 0.15 },
        { upperBound: 1250000, rate: 0.2 },
        { upperBound: 1500000, rate: 0.25 },
        { upperBound: Infinity, rate: 0.3 }
    ],
    '60to80': [
        { upperBound: 300000, rate: 0 },
        { upperBound: 500000, rate: 0.05 },
        { upperBound: 750000, rate: 0.1 },
        { upperBound: 1000000, rate: 0.15 },
        { upperBound: 1250000, rate: 0.2 },
        { upperBound: 1500000, rate: 0.25 },
        { upperBound: Infinity, rate: 0.3 }
    ],
    'above80': [
        { upperBound: 500000, rate: 0 },
        { upperBound: 750000, rate: 0.05 },
        { upperBound: 1000000, rate: 0.1 },
        { upperBound: 1250000, rate: 0.15 },
        { upperBound: 1500000, rate: 0.2 },
        { upperBound: Infinity, rate: 0.25 }
    ],
    // ... add more age categories if needed
    };
  let tax;
    if (income <= 50000) {
        tax = income * 0.05; // 5% tax rate for income up to 50,000
    } else if (income <= 100000) {
        tax = (50000 * 0.05) + ((income - 50000) * 0.1); // 5% tax on first 50,000 and 10% on remaining income up to 100,000
    } else if (income <= 150000) {
        tax = (50000 * 0.05) + (50000 * 0.1) + ((income - 100000) * 0.15); // 5% on first 50,000, 10% on next 50,000, and 15% on remaining income up to 150,000
    } else {
        tax = (50000 * 0.05) + (50000 * 0.1) + (50000 * 0.15) + ((income - 150000) * 0.2); // 5% on first 50,000, 10% on next 50,000, 15% on next 50,000, and 20% on remaining income
    }

  // Total taxable income
  let taxableIncome = grossSalary + otherIncome;

  // Deductions
  let totalDeductions = investment80C + medicalInsurance + charityDonation + educationLoan + savingsInterest;
  taxableIncome -= totalDeductions;

  // HRA Exemption
  let hraExemption = metroCity === "Yes" ? Math.min(hraReceived, 0.5 * (basicSalary + dearnessAllowance)) : Math.min(hraReceived, 0.4 * (basicSalary + dearnessAllowance));
  taxableIncome -= hraExemption;

  // Calculate the tax based on the applicable brackets
  let taxPayable = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of applicableBrackets) {
      if (remainingIncome <= 0) break;

      if (remainingIncome > bracket.upperBound) {
          taxPayable += ((bracket.upperBound - (taxableIncome - remainingIncome)) * bracket.rate);
          remainingIncome -= (bracket.upperBound - (taxableIncome - remainingIncome));
      } else {
          taxPayable += (remainingIncome * bracket.rate);
          break;
      }
  }

  return taxPayable;
}

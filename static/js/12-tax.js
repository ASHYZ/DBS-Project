document.getElementById('taxCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get form inputs
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
    const tax = calculateTax(grossSalary, otherIncome, investment80C, medicalInsurance, charityDonation, educationLoan, savingsInterest, basicSalary, dearnessAllowance, hraReceived, totalRentPaid, metroCity);
  
    // Display result
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Tax Payable: $${tax.toFixed(2)}`;
  });
  
  function calculateTax(grossSalary, otherIncome, investment80C, medicalInsurance, charityDonation, educationLoan, savingsInterest, basicSalary, dearnessAllowance, hraReceived, totalRentPaid, metroCity) {
    // Define tax slabs and rates
    const TAX_BRACKETS = [
        { upperBound: 250000, rate: 0 },
        { upperBound: 500000, rate: 0.05 },
        { upperBound: 1000000, rate: 0.2 },
        { upperBound: Infinity, rate: 0.3 }
    ];
  
    // Total taxable income
    let taxableIncome = grossSalary + otherIncome;
  
    // Deductions
    let totalDeductions = investment80C + medicalInsurance + charityDonation + educationLoan + savingsInterest;
    taxableIncome -= totalDeductions;
  
    // HRA Exemption
    let hraExemption = metroCity === "Yes" ? Math.min(hraReceived, 0.5 * (basicSalary + dearnessAllowance)) : Math.min(hraReceived, 0.4 * (basicSalary + dearnessAllowance));
    taxableIncome -= hraExemption;
  
    // Calculate the tax based on slabs
    let taxPayable = 0;
    let remainingIncome = taxableIncome;
  
    for (const bracket of TAX_BRACKETS) {
        if (remainingIncome <= 0) break;
  
        if (remainingIncome > bracket.upperBound) {
            taxPayable += (bracket.upperBound * bracket.rate);
            remainingIncome -= bracket.upperBound;
        } else {
            taxPayable += (remainingIncome * bracket.rate);
            break;
        }
    }
  
    return taxPayable;
  }
  
let persons = [];
let salaries = [];

function addSalary() {
  const selectEmployee = document.getElementById('selectEmployee');
  const enterSalary = document.getElementById('enterSalary').value;
  const selectedPerson = selectEmployee.options[selectEmployee.selectedIndex].value;

  if (selectedPerson && enterSalary && !isNaN(enterSalary)) {
    persons.push(selectedPerson);
    salaries.push(parseInt(enterSalary));
    displaySalary();
    document.getElementById('enterSalary').value = '';
    document.getElementById('selectEmployee').focus();
  } else {
    alert('Please enter valid name and numeric salary!');
  }
}

function displayResults() {
  const resultsDiv = document.getElementById('results');
  const average = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
  const highest = Math.max(...salaries);

  resultsDiv.innerHTML = `
    <h2>Results</h2>
    <p>Average Salary: ${average}</p>
    <p>Highest Salary: ${highest}</p>
  `;
}

function displaySalary() {
  const tableBody = document.getElementById('results_table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  for (let i = 0; i < persons.length; i++) {
    const row = tableBody.insertRow(-1);
    const cellName = row.insertCell(0);
    const cellSalary = row.insertCell(1);

    cellName.innerHTML = persons[i];
    cellSalary.innerHTML = salaries[i];
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('selectEmployee').focus();
});

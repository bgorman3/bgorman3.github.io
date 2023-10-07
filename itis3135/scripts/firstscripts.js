// defaultscripts.js

const date = new Date();
const dayOfWeek = date.getDay();
const dateString = date.toLocaleDateString();

const dayOfWeekString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];

// Update the heading with the current date and day of the week
document.getElementById("heading").innerHTML = `Today is ${dayOfWeekString}, ${dateString}`;


function scriptTest() {
    alert("Hey my script is running!");
  }
  
  // firstscripts.js
  function greetUser() {
    const name = document.getElementById("name").value;
    const mood = document.getElementById("mood").value;
  
    const greeting = document.getElementById("greeting");
    greeting.innerHTML = `Welcome to Gormo Tech Ventures, ${name}! We're glad you're doing ${mood}.`;
  }
  
  function getFavoritePolygon() {
  const favoriteNumber = document.getElementById("favorite-number").value;

  // Convert negative numbers and decimals to positive integers
  if (favoriteNumber < 0) {
    favoriteNumber = Math.abs(favoriteNumber);
  }
  if (!Number.isInteger(favoriteNumber)) {
    favoriteNumber = Math.round(favoriteNumber);
  }

  // Get the name of the polygon with the given number of sides
  const polygonNames = ["triangle", "quadrilateral", "pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon"];
  const polygonName = polygonNames[favoriteNumber - 3];

  // Display the name of the polygon in an alert box
  alert(`Your favorite polygon has ${favoriteNumber} sides, and is called a ${polygonName}.`);
}
  
  // Add other functions here...
  
  // Add an event listener to the "Get Favorite Polygon" button
const getFavoritePolygonButton = document.getElementById("getFavoritePolygon");
getFavoritePolygonButton.addEventListener("click", getFavoritePolygon);

  // Call the functions when the corresponding buttons are clicked
  document.getElementById("functions").addEventListener("click", function(event) {
  const functionName = event.target.getAttribute("onclick");
    window[functionName]();
  });
  function updateValidationButtons() {
    const validationButtons = document.querySelectorAll(".validation-button");
  
    for (const button of validationButtons) {
      const validationURI = button.getAttribute("href");
      const newValidationURI = validationURI.replace("{URL}", window.location.href);
      button.setAttribute("href", newValidationURI);
    }
  }
  
  window.addEventListener("load", updateValidationButtons);

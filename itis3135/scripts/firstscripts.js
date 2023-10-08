// Function to display date and time
function displayDateTime() {
    const now = new Date();
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][now.getDay()];
    
    const month = now.toLocaleString('default', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours() % 12 || 12; // Get 12-hour format
    const minutes = now.getMinutes();
    const amOrPm = now.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    
    const dateTimeString = `Today is ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm} on ${dayOfWeek}, ${month} ${date}, ${year}`;
    document.getElementById("dateTime").textContent = dateTimeString;
   
}


// Function to greet the user
function greetUser() {
    const name = document.getElementById("name").value;
    const mood = document.getElementById("mood").value;
    const greeting = document.getElementById("greeting");
    greeting.textContent = `Welcome to Gormo Tech Ventures, ${name}! We're glad you're doing ${mood}.`;
    alert(`Welcome, ${name}! We're glad you're doing ${mood}.`);
}

// Function to get polygon name
function getPolygonName() {
    let favoriteNumber = parseInt(document.getElementById("favorite-number").value);
    if (isNaN(favoriteNumber)) {
        favoriteNumber = 0;
    }
    favoriteNumber = Math.abs(favoriteNumber);
    favoriteNumber = Math.round(favoriteNumber);
    
    const polygonNames = ["digon", "triangle", "quadrilateral", "pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon"];
    const polygonName = polygonNames[favoriteNumber];
    
    alert(`Your favorite polygon has ${favoriteNumber} sides, and it is called a ${polygonName}.`);
}

// Functions for Animal Brand Company
function function1() {
    alert("Function 1: We provide the quirkiest animal-themed merchandise!");
}

function function2() {
    alert("Function 2: Our animals can predict the weather. Ask us for today's forecast!");
}

function function3() {
    alert("Function 3: We offer pet psychic readings. Find out what your pet is thinking!");
}
function function4(){
    alert("We cant wait for your buisness for the GreedyGoblins")
}
// Call displayDateTime function when the page loads
displayDateTime();

// survey.js

// Function to prevent form submission without necessary information
document.getElementById('introForm').addEventListener('submit', function (event) {
  const name = document.getElementById('name').value;
  const mascot = document.getElementById('mascot').value;
  const image = document.getElementById('image').value;
  const imageCaption = document.getElementById('imageCaption').value;
  const personalBackground = document.getElementById('personalBackground').value;
  const professionalBackground = document.getElementById('professionalBackground').value;
  const academicBackground = document.getElementById('academicBackground').value;
  const webDevelopmentBackground = document.getElementById('webDevelopmentBackground').value;
  const computerPlatform = document.getElementById('computerPlatform').value;

  if (
    name === '' ||
    mascot === '' ||
    image === '' ||
    imageCaption === '' ||
    personalBackground === '' ||
    professionalBackground === '' ||
    academicBackground === '' ||
    webDevelopmentBackground === '' ||
    computerPlatform === ''
  ) {
    event.preventDefault(); // Prevent form submission if any required field is empty
    alert('Please fill out all required fields.');
  }
});

// Function to reset the form
document.getElementById('introForm').addEventListener('reset', function () {
  // Reset the form progress
  document.getElementById('results').style.display = 'none';
});

// Function to add new course text boxes
document.getElementById('addCourse').addEventListener('click', function () {
  const coursesContainer = document.getElementById('coursesContainer');
  const newCourseInput = document.createElement('input');
  newCourseInput.type = 'text';
  newCourseInput.className = 'courseInput';
  newCourseInput.name = 'coursesTaking[]';
  newCourseInput.required = true;
  coursesContainer.appendChild(newCourseInput);

  // Add a delete button beside the new course text box
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'deleteCourse';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    coursesContainer.removeChild(newCourseInput);
    coursesContainer.removeChild(deleteButton);
  });
  coursesContainer.appendChild(deleteButton);
});

// Function to gather data from the form and create a new page
document.getElementById('introForm').addEventListener('submit', function (event) {
event.preventDefault(); // Prevent form submission

// Gather form data
const formData = new FormData(this);
const formDataObject = {};
formData.forEach((value, key) => {
  if (formDataObject[key]) {
    if (Array.isArray(formDataObject[key])) {
      formDataObject[key].push(value);
    } else {
      formDataObject[key] = [formDataObject[key], value];
    }
  } else {
    formDataObject[key] = value;
  }
});

// Create a new HTML page with form data
const newPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formDataObject.name}'s ${formDataObject.mascot} || ITIS 3135 Introduction</title>
  <link rel="stylesheet" href="styles/default.css">
  <style>
      body {
          background-image: url('images/backgroundimg.jpeg');
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          margin: 0;
          padding: 0;
      }

     
  </style>   
 
</head>
<body>
  <div class="container">
  <div data-include="components/header.html"></div>
    <script src="scripts/HTMLInclude.min.js"></script>
 

  <main>
      <h2>${formDataObject.name}'s ${formDataObject.mascot} Introduction</h2>
      <div class="image-container">
          <figure>
              <img src="${formDataObject.image}" alt="${formDataObject.imageCaption}" class="center" height="400">
              <figcaption><em>${formDataObject.imageCaption}</em></figcaption>
          </figure>
      </div>

      <div class="introduction-box">
      <ul>
      
          <li style="text-align: left;"><strong>Personal Background:</strong> ${formDataObject.personalBackground}</li>
          
          <li style="text-align: left;"><strong>Professional Background:</strong> ${formDataObject.professionalBackground}</li>
          
          <li style="text-align: left;"><strong>Academic Background:</strong>${formDataObject.academicBackground}</li>
          
          <li style="text-align: left;"><strong>Background in this Subject:</strong> ${formDataObject.webDevelopmentBackground}</li>
          
          <li style="text-align: left;"><strong>Primary Computer Platform:</strong>  ${formDataObject.computerPlatform}</li>
          
          <li style="text-align: left;"><strong>Courses I'm Taking & Why:</strong>
              <ul>
              ${formDataObject['coursesTaking[]'].map(course => `<li>${course}</li>`).join('')}
              </ul>
          </li>
          
          <li style="text-align: left;"><strong>Funny/Interesting Item about Yourself:</strong> ${formDataObject.funnyThing || 'N/A'}</li>
          
          <li style="text-align: left;"><strong>I'd also like to Share:</strong> ${formDataObject.anythingElse || 'N/A'}</li>
      </ul>
      </div>
      <a href="byo_intro.html" class="button">Fill out the form again</a>
  </main>
  <div data-include="components/footer.html"></div>
  <script src="scripts/HTMLInclude.min.js"></script>

  </div>
   </body>
   </html>
    `;

// Open the new page in a new tab
const newPageWindow = window.open('');
newPageWindow.document.write(newPage);
});

// Function to reset form progress
document.getElementById('resetForm').addEventListener('click', function () {
document.getElementById('introForm').reset();
});
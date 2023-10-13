// Prevent form from submitting without necessary information
function validateForm() {
    var name = document.getElementById("name");
    var mascot = document.getElementById("mascot");
    var image = document.getElementById("image");
    var imageCaption = document.getElementById("imageCaption");
    var personalBackground = document.getElementById("personalBackground");
    var professionalBackground = document.getElementById("professionalBackground");
    var academicBackground = document.getElementById("academicBackground");
    var backgroundInWebDevelopment = document.getElementById("backgroundInWebDevelopment");
    var primaryComputerPlatform = document.getElementById("primaryComputerPlatform");
    var coursesCurrentlyTaking = document.getElementById("coursesCurrentlyTaking");
    var funnyThing = document.getElementById("funnyThing");
    var anythingElse = document.getElementById("anythingElse");
    var agree = document.getElementById("agree");
  
    if (name.value === "" || mascot.value === "" || image.value === "" || imageCaption.value === "" || personalBackground.value === "" || professionalBackground.value === "" || academicBackground.value === "" || backgroundInWebDevelopment.value === "" || primaryComputerPlatform.value === "" || coursesCurrentlyTaking.value === "" || funnyThing.value === "" || anythingElse.value === "" || !agree.checked) {
      alert("Please fill out all required fields.");
      return false;
    } else {
      return true;
    }
  }
  
  // Add event listener to the form's submit button
  document.querySelector("form").addEventListener("submit", validateForm);
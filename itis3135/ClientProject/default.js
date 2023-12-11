let slideIndex = 1;
showSlide(slideIndex);

function plusSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}



  function searchImages() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    fetchImages(searchTerm);
  }
  
  async function fetchImages(searchTerm) {
    const response = await fetch('images.json');
    const images = await response.json();
    const results = searchImagesInDatabase(images, searchTerm);
    displaySearchResults(results);
  }
  
  function searchImagesInDatabase(images, searchTerm) {
    return images.filter(image => image.name.toLowerCase().includes(searchTerm));
  }
  
  
  
  function displaySearchResults(results) {
    if (results.length === 0) {
        alert('No results found.');
    } else {
        let message = 'Images found on pages:\n';
        results.forEach(result => {
            message += `Image '${result.name}' on page: ${result.title}\n`;
        });
        alert(message);
    }
}

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  var formData = {
      name: $('input[name="name"]').val(),
      email: $('input[name="email"]').val(),
      password: $('input[name="password"]').val()
  };

  // Display an alert with the form data
  alert('Form Data:\nName: ' + formData.name + '\nEmail: ' + formData.email + '\nPassword: ' + formData.password);
}

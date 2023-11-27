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
    const response = await fetch('./images.json');
    const images = await response.json();
    const filteredImages = images.filter(image => image.name.toLowerCase().includes(searchTerm));
    displayImages(filteredImages);
  }
  
  function displayImages(imageArray) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';
  
    imageArray.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `./images/${image.filename}`;
      imgElement.alt = image.name;
  
      imgElement.addEventListener('click', () => {
        navigateToPage(image.page);
      });
  
      imageContainer.appendChild(imgElement);
    });
  }
  
  function navigateToPage(page) {
    window.location.href = page;
  }
  
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
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  if (results.length === 0) {
      alert('No results found.');
  } else {
      let message = 'Images found on pages:\n';
      results.forEach(result => {
          message += `Image '${result.name}' on page: ${result.page}\n`;
      });
      alert(message);
  }
}
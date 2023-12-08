



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
alert("Hello, this is an alert!");

function navigateToPage(page) {
  window.location.href = page;
}

$(document).ready(function(){
  $('.tooltip-trigger').hover(
      function() {
          var tooltipText = $(this).attr('data-tooltip');
          $('<div class="tooltip"></div>').text(tooltipText).appendTo($(this).parent()).fadeIn('fast');
      },
      function() {
          $(this).parent().find('.tooltip').remove();
      }
  ).mousemove(function(e) {
      var xOffset = 10;
      var yOffset = 10 + ($(this).height() / 2); // Adjust the yOffset based on half of the image height
      var mousex = e.pageX + xOffset;
      var mousey = e.pageY + yOffset;
      $(this).parent().find('.tooltip').css({ top: mousey, left: mousex });
  });
});
$(document).ready(function(){
  // Example: Initialize a jQuery UI widget (e.g., datepicker)
  $('#datepicker').datepicker();
});


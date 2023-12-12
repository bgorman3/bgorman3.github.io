// Function to load images dynamically
function loadAllImages() {
    // Make an AJAX request to get the image data
    $.ajax({
      url: 'images.json', // Replace with the path to your JSON file
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // Iterate through all images and append them to the container
        for (var i = 0; i < data.length; i++) {
          var image = data[i];
          $('#dynamicImageContainer').append(
            '<figure class="tooltip">' +
            '<a href="' + image.page + '">' +
            '<img class="resizable-image" src="' + image.filename + '" alt="' + image.name + '" credit="' + image.credit + '">' +
            '</a>' +
            '<figcaption>' + image.name + '</figcaption>' +
            '<div class="tooltiptext">Credit: ' + image.credit + '</div>' +
            '</figure>'
          );
        }
  
        // Apply tooltip and image resizing after adding images
        $('.tooltip .resizable-image').resizable({
          aspectRatio: true, // Maintain aspect ratio while resizing
          handles: 'ne, se, sw, nw' // Resize handles on all corners
        });
  
        $('.tooltip').hover(
          function () {
            // Mouse over
            $(document).on('mousemove', function (e) {
              $('.tooltiptext').css({
                top: e.clientY + 10,
                left: e.clientX + 10
              }).fadeIn(200);
            });
          },
          function () {
            // Mouse out
            $(document).off('mousemove');
            $('.tooltiptext').fadeOut(200);
          }
        );
  
        $('.tooltip img').click(function (e) {
          e.stopPropagation(); // Prevent the tooltip from triggering
          window.location.href = $(this).parent().attr('href');
        });
      },
      error: function () {
        console.error('Error loading images.');
      }
    });
  }
  
  // Call the function to load all images dynamically
  loadAllImages();
  
$(function() {
    var availableTags = [
        "BMW", "Nissan", "Lexus", "Chevrolet", "Porsche", "Infiniti", "Datsun",
        "Toyota", "Subaru", "Lamborghini", "Volkswagen", "Ford", "Honda", "Audi",
        "Mercedes-Benz", "Volvo", "Hyundai", "Kia", "Mazda", "Jaguar", "Land Rover",
        "Tesla", "Buick", "Jeep", "Chrysler", "Ram", "GMC", "Cadillac", "Acura",
        "Lincoln", "Mini", "Fiat", "Maserati", "Ferrari", "Alfa Romeo", "Bentley",
        "Rolls-Royce", "Aston Martin", "Lancia", "Bugatti", "McLaren", "Lotus",
        "Suzuki", "Smart", "Maybach", "Saab", "Scion", "Plymouth", "Hummer",
        "Saturn", "Oldsmobile", "Geo", "Isuzu"
    ];
  
    $("#searchInput").autocomplete({
        source: availableTags
    });
  
    $('.tooltip .resizable-image').resizable({
        aspectRatio: true, // Maintain aspect ratio while resizing
        handles: 'ne, se, sw, nw' // Resize handles on all corners
    });
  
    $('.tooltip').hover(
        function() {
            // Mouse over
            $(document).on('mousemove', function(e) {
                $('.tooltiptext').css({
                    top: e.clientY + 10,
                    left: e.clientX + 10
                }).fadeIn(200);
            });
        },
        function() {
            // Mouse out
            $(document).off('mousemove');
            $('.tooltiptext').fadeOut(200);
        }
    );
  
    $('.tooltip img').click(function(e) {
        e.stopPropagation(); // Prevent the tooltip from triggering
        window.location.href = $(this).parent().attr('href');
    });
  });

  $(document).ready(function () {
    // Function to load images dynamically
    function loadImages() {
      // Make an AJAX request to get the image data
      $.ajax({
        url: 'images.json', // Replace with the path to your JSON file
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          // Iterate through the image data and append images to the container
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

    // Call the function to load images dynamically
    loadImages();

    // Your existing code for other functionalities...
    // ...

    // Add an event listener for the search button
    $('#searchButton').on('click', function () {
      searchImages();
    });

    // Your existing code for the form submission...
    // ...
  });

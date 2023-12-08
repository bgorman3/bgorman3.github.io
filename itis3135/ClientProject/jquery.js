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
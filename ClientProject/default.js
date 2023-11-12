document.getElementById("searchbutton").addEventListener("click", function() {
    // Get the search term from the input field
    var searchTerm = document.getElementById("searchbar").value;
  
    // Perform the search
    // This could involve searching a database or a local list of data
    // For example, you could use the following code to search a list of fruits:
  
    var fruits = ["apple", "banana", "orange"];
    var results = fruits.filter(fruit => fruit.includes(searchTerm));
  
    // Display the results
    // This could involve displaying a list of the results on the page or redirecting the user to a new page with the results
    // For example, you could use the following code to display a list of the results on the page:
  
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
      var result = document.createElement("li");
      result.innerHTML = results[i];
      resultsContainer.appendChild(result);
    }
  });


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

  document.getElementById("searchbutton").addEventListener("click", function() {
    // Get the search term from the input field
    var searchTerm = document.getElementById("searchbar").value.toLowerCase(); // Convert to lowercase for case-insensitive search

    // Get all paragraphs (you can modify this to include other elements or text you want to search)
    var paragraphs = document.getElementsByTagName("p");

    var found = []; // To store matched content

    // Loop through each paragraph to find matches
    for (var i = 0; i < paragraphs.length; i++) {
        var text = paragraphs[i].textContent.toLowerCase(); // Get the text content and convert to lowercase

        if (text.includes(searchTerm)) {
            found.push(paragraphs[i].textContent); // If a match is found, add it to the 'found' array
        }
    }

    // Display the results
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (found.length === 0) {
        resultsContainer.innerHTML = "No results found.";
    } else {
        for (var j = 0; j < found.length; j++) {
            var result = document.createElement("p");
            result.innerHTML = found[j];
            resultsContainer.appendChild(result);
        }
    }
});
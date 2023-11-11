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
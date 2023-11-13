document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    const dropdownContent = document.querySelector(".dropdown-content");

    // Listen for the dropdown hover event
    document.querySelector(".dropdown").addEventListener("mouseover", function () {
        // When dropdown is hovered, add the class to adjust main content margin
        main.classList.add("main-with-dropdown");
    });

    // Listen for the mouseout event to remove the added class
    dropdownContent.addEventListener("mouseout", function (event) {
        // Check if the mouse leaves the dropdown area
        if (!event.relatedTarget || !dropdownContent.contains(event.relatedTarget)) {
            main.classList.remove("main-with-dropdown");
        }
    });
});

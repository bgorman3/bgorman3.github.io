function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketchContainer'); // Make the canvas a child of sketchContainer
    background(255); // Set the initial background
}

function draw() {
    // Your drawing code here (if any additional effects or functionalities are desired)
}

function mouseDragged() {
    // This function draws a line following the mouse movement
    stroke(0); // Set the stroke color (black in this case)
    strokeWeight(2); // Set the stroke weight
    line(pmouseX, pmouseY, mouseX, mouseY); // Draw a line from previous mouse position to current position
}

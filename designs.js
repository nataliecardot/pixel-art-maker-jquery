// Since script tag is at  end of  body, $(document).ready() is not required

const pixelCanvas = $('.pixel-canvas');

// Creates grid upon clicking 'submit' button (submit event)
$('.size-picker').submit(function makeGrid(e) {
  // preventDefault() method intercepts 'submit' event, which would normally submit the form and cause the page to refresh, preventing makeGrid() function from being processed
  e.preventDefault();
  // If grid is already present, clears any cells that have been filled in
  $('table tr').remove();
  // Grid height value entered by user
  const heightInput = $('.input-height').val();
  // Grid width value entered by user
  const widthInput = $('.input-width').val();
  // Outer for loop adds desired number of rows (grid height)
  for (let i = 1; i <= heightInput; i++) {
    $('table').append('<tr></tr>');
    /* Inner loop adds desired number of columns as cells (td) within rows (tr) and creates a class called 'Cell' for each cell (td). Class is used later, allowing user to color cells on click. (Capitalized class 'Cell' because the Udacity Frontend Nanodegree Style Guide (JavaScript page) advises using Pascal Case for class names) */
    for (let j = 1; j <= widthInput; j++) {
      // ':last' is a jQuery extension (not part of CSS specification) that selects a single element by filtering the current jQuery collection and matching the last element within it. For best performance using ':last', first select element(s) using pure CSS selector, then use .filter(":last").
      $('tr').filter(':last').append('<td></td>');
    }
  }
  dragColor();
});

// function to allow mouse-drag coloring
function dragColor() {
  // Filters clicks by those in cells. Note: 'mousedown' event is fired when the mouse button is pressed but before it's released, whereas 'click' event is fired after mousedown (click) and mouseup (release) events have completed
  pixelCanvas.on('mousedown', 'td', function() {
    mousedown = true;
  });

  // 'mouseup': when pointer is over element and mouse button has been clicked then released
  $(document).mouseup(function() {
    mousedown = false;
  });

  // Fills in cells with color if mouse pointer is moving and being held down over cell
  pixelCanvas.on('mousemove', 'td', function() {
    // Variable 'color' is defined here rather than globally so JS checks whether a new color has been picked before each mousedown event
    let color = $('.color-picker').val();
    if (mousedown) {
      // Selector 'this' refers to pixelCanvas
      $(this).css('background-color', color);
    }
  });
};

// since script tag is at end of body, $(document).ready() not required

const pixelCanvas = $('.pixel-canvas');

// creates grid upon clicking 'submit' button (submit event)
function makeGrid(e) {
  // preventDefault() method intercepts 'submit' event, which would normally submit the form and cause the page to refresh, preventing makeGrid() function from being processed
  if (e) {
    e.preventDefault();
  }
  // if grid is already present, clears any cells that have been filled in
  $('table tr').remove();
  // grid height value entered by user
  const heightInput = $('.input-height').val();
  // grid width value entered by user
  const widthInput = $('.input-width').val();
  // outer for loop adds desired number of rows (grid height)
  for (let i = 1; i <= heightInput; i++) {
    $('table').append('<tr></tr>');
    // inner loop adds desired number of columns as cells (td) within rows (tr) and creates a class called 'Cell' for each cell (td). Class is used later, allowing user to color cells on click. (Capitalized class 'Cell' because the Udacity Frontend Nanodegree Style Guide (JavaScript page) advises using Pascal Case for class names)
    for (let j = 1; j <= widthInput; j++) {
      // ':last' is a jQuery extension (not part of CSS specification) that selects a single element by filtering the current jQuery collection and matching the last element within it. For best performance using ':last', first select element(s) using pure CSS selector, then use .filter(":last")
      $('tr').filter(':last').append('<td></td>');
      // here, .attr() method sets attribute (class) to name provided as second argument for matched elements (td)
      $('td').attr('class', 'Cell');
    }
  }
  // fills in cell with chosen color when mouse button is pressed down over it. Unlike function dragColor(), doesn't require mouse to enter a cell while mouse button is being held down. Note: 'mousedown' event is fired when the mouse button is pressed but before it's released, whereas click event is fired after mousedown (click) and mouseup (release) events have completed
  $('.Cell').mousedown(function() {
  // adds chosen color to cell upon a click event. Selector 'this' refers to cell (with class 'Cell') being clicked. Variable 'color' is defined here rather than globally so JS checks whether a new color has been picked before each mousedown event
    let color = $('.color-picker').val();
    $(this).css('background-color', color);
  });
  dragColor();
};

$('.size-picker').submit(makeGrid);

// enables mouse-drag coloring. Fills in cell when mouse pointer enters it and mouse is pressed down
function dragColor() {
  // filters clicks by those in cells. Note: 'mousedown' event is fired when the mouse button is pressed but before it's released, whereas 'click' event is fired after mousedown (click) and mouseup (release) events have completed
  pixelCanvas.on('mousedown', 'td', function() {
    mousedown = true;
  });

  // 'mouseup': when pointer is over element and mouse button has been clicked then released
  $(document).mouseup(function() {
    mousedown = false;
  });

  // 'mouseover' triggered when mouse pointer enters an element
  pixelCanvas.on('mouseover', 'td', function() {
    // variable 'color' is defined here rather than globally so JS checks whether a new color has been picked before each mousedown event
    let color = $('.color-picker').val();
    if (mousedown) {
      // Selector 'this' refers to pixelCanvas
      $(this).css('background-color', color);
    }
  });
}

// removes color from cell on double-click
$(pixelCanvas).on('dblclick', 'td', function() {
  $(this).removeAttr('style');
});

$(window).on('load', makeGrid);

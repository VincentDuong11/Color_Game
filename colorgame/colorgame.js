var numberOfSquares = 6;
var pickedColor;
var colors = [];
// [
//   "rgb(255, 0, 0)",
//   "rgb(255, 255, 0)",
//   "rgb(0, 255, 0)",
//   "rgb(0, 255, 255)",
//   "rgb(0, 0, 255)",
//   "rgb(255, 0, 255)",
// ];

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButton();
  setupSquares();
  reset();
}

function setupModeButton() {
  //mode button event listener
  for (var i = 0; i < modeButton.length; i++) {
    modeButton[i].addEventListener("click", function () {
      modeButton[0].classList.remove("selected");
      modeButton[1].classList.remove("selected");

      this.classList.add("selected");

      this.textContent === "Easy"
        ? (numberOfSquares = 3)
        : (numberOfSquares = 6);
      // if(this.textContent === "Easy"){
      //   numberOfSquares = 3;
      // }else{
      //   numberOfSquares = 6;
      // }
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add click listener to squares
    squares[i].addEventListener("click", function () {
      //grab color of clicked square
      var clickedColor = this.style.background;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        messageDisplay.classList.add("correct");
        messageDisplay.classList.remove("retry");
        resetButton.textContent = "Play Again";
        changeColor(clickedColor);
        h1.style.background = clickedColor;
      } else {
        this.style.background = "#232323";

        messageDisplay.classList.add("retry");
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numberOfSquares);
  //pick a new random color from the array
  pickedColor = pickColor();
  //change the colorDisplay to match the picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Color";
  messageDisplay.textContent = "";
  //change the color of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
  reset();
});

colorDisplay.textContent = pickedColor;

function changeColor(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.background = color;
  }
}

function pickColor() {
  //generate random array
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //create an array
  var array = [];
  //add num random colors to array
  //repeat num times
  for (var i = 0; i < num; i++) {
    //get random color and push into array
    array.push(randomColor());
  }
  return array;
}

function randomColor() {
  //generate a "red" from 0 -255
  var r = Math.floor(Math.random() * 256);
  //generate a "red" from 0 -255
  var g = Math.floor(Math.random() * 256);
  //generate a "red" from 0 -255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

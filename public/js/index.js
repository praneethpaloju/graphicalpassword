var imageInput = document.getElementById("image-input");
var selectedImage = document.getElementById("selected-image");
var spotCoordinates = document.getElementById("spot-coordinates");
var spots = [];

imageInput.addEventListener("change", function (event) {
  var file = event.target.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(file);
  }
});

selectedImage.addEventListener("click", function (event) {
  if (spots.length < 4) {
    var rect = selectedImage.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    var spot = {
      x: offsetX,
      y: offsetY,
    };

    spots.push(spot);

    updateSpotCoordinates();
  }
});

function updateSpotCoordinates() {
  spotCoordinates.innerHTML = "";
  for (let i = 0; i < spots.length; i++) {
    var coordinateText = document.createElement("p"); 
    // coordinateText.textContent =
    //   "Spot coordinates: (" + spots[i].x + ", " + spots[i].y + ")";
    // const inputs = document.getElementsByClassName("input-coordinates");
    // inputs.setAttribute("VALUE", spot.x + ", " + spot.y);
    var inputs = document.querySelectorAll(".input-coordinates");
     inputs[i].setAttribute("VALUE", Math.floor(spots[i].x) + ", " +Math.floor(spots[i].y));
    //  inputs[i].setAttribute("VALUE", spots[i].x + ", " +spots[i].y);


    spotCoordinates.appendChild(coordinateText);
  }
}

// fetch("/").then(response => response.json()).then(data => {
//   // Displaying the error message in a popup alert
//   alert("Enter Fields Correctly");
// }).catch(error => {
//   console.error(error);
// });
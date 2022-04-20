// Fill the grid with tiles
function fillGrid() {
    var screenTileWidth = canvas.width/100+1;
    var screenTileHeight = canvas.height/25+1;
    for (var yPlace = 0; yPlace < screenTileHeight; yPlace++) {
        for (var xPlace = 0; xPlace < screenTileWidth; xPlace++) {
            var xOffset = xPlace*200;
            if (yPlace % 2 == 0) {
                xOffset -= 100;
            }
            var rand = Math.random();
            if (rand < 0.6) {
                ctx.drawImage(blankImg, xOffset, yPlace*50-250);
            } else if (rand < 0.8){
                ctx.drawImage(houseImg, xOffset, yPlace*50-250);
            } else {
                ctx.drawImage(house2Img, xOffset, yPlace*50-250);
            }
        }
    }
};

function getAndResizeImage(filePath) {
    var newImage = new Image();
    newImage.src = filePath;
    newImage.width = 100;
    newImage.height = 100;
    return newImage;
}

// Get canvas
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
// Resize to screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.scale(0.5, 0.5)

// Hide Scrollbar
document.documentElement.style.overflow = 'hidden';  // firefox, chrome
document.body.scroll = "no"; // ie only

var blankImg = getAndResizeImage("tiles/blank_tile.png");
var houseImg = getAndResizeImage("tiles/house_tile.png");
var house2Img = getAndResizeImage("tiles/house2_tile.png");

window.onload = fillGrid;


function windowResize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  fillGrid();
};

window.addEventListener('resize', windowResize);


var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var tiles = []

// Fill the grid with tiles
function fillGrid() {
    var screenTileWidth = canvas.width/100+1;
    var screenTileHeight = canvas.height/25+1;

    var grid = [];
    // fill grid with emptys
    for (var yPlace = 0; yPlace < screenTileHeight; yPlace++) {
        var temp = [];
        for (var xPlace = 0; xPlace < screenTileWidth; xPlace++) {
            temp[xPlace] = null;
        }
        grid[yPlace] = temp;
    }

    for (var yPlace = 0; yPlace < screenTileHeight; yPlace++) {
        for (var xPlace = 0; xPlace < screenTileWidth; xPlace++) {
            var xOffset = xPlace*200;
            if (yPlace % 2 == 0) {
                xOffset -= 100;
            }
            var rand = Math.random();
            if (rand < 0.6) {
                ctx.drawImage(tiles[0].image, xOffset, yPlace*50-250);
            } else if (rand < 0.8){
                ctx.drawImage(tiles[1].image, xOffset, yPlace*50-250);
            } else {
                ctx.drawImage(tiles[2].image, xOffset, yPlace*50-250);
            }
        }
    }
};

// {u1:[], u2:[], d1:[], d2:[]}
function populateTiles() {
    tiles[0] = createImage("0_blank_tile", {u1:[0, 1, 2, 4, 5, 7], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});
    tiles[1] = createImage("1_house_tile", {u1:[0, 1, 2, 4, 5, 7], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});
    tiles[2] = createImage("2_house2_tile", {u1:[0, 1, 2, 4, 5, 7], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});
    
    tiles[3] = createImage("3_straight_road_1_tile", {u1: [3, 6, 8], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[3, 5, 7]});  // 
    tiles[4] = createImage("4_straight_road_2_tile", {u1: [0, 1, 2, 4, 6, 8], u2:[4, 5, 8], d1:[4, 6, 7], d2:[0, 1, 2, 4, 6, 8]});  // /
    
    tiles[5] = createImage("5_curved_road_1_tile", {u1: [3, 6, 8], u2:[0, 1, 2, 3, 6, 7], d1:[4, 6, 7], d2:[0, 1, 2, 4, 6, 8]});    // >
    tiles[6] = createImage("6_curved_road_2_tile", {u1: [0, 1, 2, 4, 6, 8], u2:[4, 5, 8], d1:[0, 1, 2, 3, 5, 8], d2:[3, 5, 7]});    // <
    tiles[7] = createImage("7_curved_road_3_tile", {u1: [3, 6, 8], u2:[4, 5, 8], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});    // v
    tiles[8] = createImage("8_curved_road_4_tile", {u1: [0, 1, 2, 4, 6, 8], u2:[0, 1, 2, 3, 6, 7], d1:[4, 6, 7], d2:[3, 5, 7]});    // ^
}

// Retrieve an image from a file path
function createImage(filePath, connections) {
    var newImage = new Image();
    newImage.src = "tiles/"+filePath+".png";
    newImage.width = 100;
    newImage.height = 100;
    return {image: newImage, validConnections: connections};
}

// Resize window and regenerate canvas
function windowResize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  fillGrid();
};

// Main function
function main() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.scale(0.5, 0.5)

    // Hide Scrollbar
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only

    window.onload = fillGrid;

    window.addEventListener('resize', windowResize);
};

populateTiles();
main();
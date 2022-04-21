
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");


var tiles = [];

var grid = [];
var frontier = [];


// Fill the grid with tiles
function fillGrid() {
	
	var screenTileWidth = canvas.width/100+1;
	var screenTileHeight = canvas.height/25+1;

    grid = [];
    // fill grid with emptys
    for (var yPlace = 0; yPlace < screenTileHeight; yPlace++) {
        var temp = [];
        for (var xPlace = 0; xPlace < screenTileWidth; xPlace++) {
            temp[xPlace] = -1;
        }
        grid[yPlace] = temp;
    }
    
    var startX = 4; //Math.floor(Math.random() * screenTileWidth);
    var startY = 12; //Math.floor(Math.random() * screenTileHeight);

    frontier = [{x:startX, y:startY}]
	grid[startY][startX] = 0;
    
   
    var ticker = setInterval(advanceDraw, 200);
    
};

function advanceDraw() {
	if (frontier.length > 0) {
        var front = frontier.pop();
        var frontTile = tiles[grid[front.y][front.x]];
        
		var upLeft = getUpLeft(front);
		var upRight = getUpRight(front);
		var downLeft = getDownLeft(front);
		var downRight = getDownRight(front);
		
		var newt = "";
		
		if (grid[upLeft.y] && grid[upLeft.y][upLeft.x] && getTile(grid, upLeft) == -1) {
			var newTiles = frontTile.validConnections.u1;
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(upLeft, temp)) {
					grid[upLeft.y][upLeft.x] = temp;
					newt += temp + " ";
					foundTile = true;
					frontier.push({x:upLeft.x, y:upLeft.y});
				}
			}
		}
		if (grid[upRight.y] && grid[upRight.y][upRight.x] && getTile(grid, upRight) == -1) {
			
			var newTiles = frontTile.validConnections.u2;
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(upRight, temp)) {
					grid[upRight.y][upRight.x] = temp;
					newt += temp + " ";
					foundTile = true;
					frontier.push({x:upRight.x, y:upRight.y});
				}
			}
		}
		if (grid[downLeft.y] && grid[downLeft.y][downLeft.x] && getTile(grid, downLeft) == -1) {
			
			var newTiles = frontTile.validConnections.d1;
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(downLeft, temp)) {
					grid[downLeft.y][downLeft.x] = temp;
					newt += temp + " ";
					foundTile = true;
					frontier.push({x:downLeft.x, y:downLeft.y});
				}
			}
		}
		if (grid[downRight.y] && grid[downRight.y][downRight.x] && getTile(grid, downRight) == -1) {
			
			var newTiles = frontTile.validConnections.d2;
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(downRight, temp)) {
					grid[downRight.y][downRight.x] = temp;
					newt += temp + " ";
					foundTile = true;
					frontier.push({x:downRight.x, y:downRight.y});
				}
			}
		}
		//alert(newt);
		frontier.sort(() => Math.random() - 0.5);
		
		drawGrid();
    }
}

function tileFits(coords, tileIndex) {
	var upLeft = getUpLeft(coords);
	var upRight = getUpRight(coords);
	var downLeft = getDownLeft(coords);
	var downRight = getDownRight(coords);
	//alert(tileIndex);
	
	if (!(getTile(grid, upLeft) == -1 || tiles[tileIndex].validConnections.u1.includes(getTile(grid, upLeft)))) {
		return false;
	}
	if (!(getTile(grid, upRight) == -1 || tiles[tileIndex].validConnections.u2.includes(getTile(grid, upRight)))) {
		return false;
	}
	if (!(getTile(grid, downLeft) == -1 || tiles[tileIndex].validConnections.d1.includes(getTile(grid, downLeft)))) {
		return false;
	}
	if (!(getTile(grid, downRight) == -1 || tiles[tileIndex].validConnections.d2.includes(getTile(grid, downRight)))) {
		return false;
	}
	return true;
}

function drawGrid() {
	for (var yPlace = 0; yPlace < grid.length; yPlace++) {
        for (var xPlace = 0; xPlace < grid[0].length; xPlace++) {
            if (grid[yPlace][xPlace] == -1) continue;
            var xOffset = xPlace*200;
            if (yPlace % 2 == 0) {
                xOffset -= 100;
            }
            ctx.drawImage(tiles[grid[yPlace][xPlace]].image, xOffset, yPlace*50-250);
        }
    }
}

function getUpLeft(coords) {
	var sX = coords.x;
	var sY = coords.y;
	if (sY % 2 == 0) {
		return {x:sX-1, y:sY-1};
	} else {
		return {x:sX, y:sY-1};
	}
};

function getUpRight(coords) {
	var sX = coords.x;
	var sY = coords.y;
	if (sY % 2 == 0) {
		return {x:sX, y:sY-1};
	} else {
		return {x:sX+1, y:sY-1};
	}
};

function getDownLeft(coords) {
	var sX = coords.x;
	var sY = coords.y;
	if (sY % 2 == 0) {
		return {x:sX-1, y:sY+1};
	} else {
		return {x:sX, y:sY+1};
	}
};

function getDownRight(coords) {
	var sX = coords.x;
	var sY = coords.y;
	if (sY % 2 == 0) {
		return {x:sX, y:sY+1};
	} else {
		return {x:sX+1, y:sY+1};
	}
};

function getTile(fromGrid, coords) {
	return fromGrid[coords.y][coords.x];
};

// {u1:[], u2:[], d1:[], d2:[]}
function populateTiles() {
    tiles[0] = createImage("0_blank_tile", {u1:[0, 1, 2, 4, 5, 7], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});
    tiles[1] = createImage("1_house_tile", {u1:[0, 1, 2, 4, 5, 7], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});
    tiles[2] = createImage("2_house2_tile", {u1:[0, 1, 2, 4, 5, 7], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});
    
    tiles[3] = createImage("3_straight_road_1_tile", {u1: [3, 6, 8], u2:[0, 1, 2, 3, 6, 7], d1:[0, 1, 2, 3, 5, 8], d2:[3, 5, 7]});  // 
    tiles[4] = createImage("4_straight_road_2_tile", {u1: [0, 1, 2, 4, 7], u2:[4, 5, 8], d1:[4, 6, 7], d2:[0, 1, 2, 4, 6, 8]});  // /
    
    tiles[5] = createImage("5_curved_road_1_tile", {u1: [3, 6, 8], u2:[0, 1, 2, 3, 6, 7], d1:[4, 6, 7], d2:[0, 1, 2, 4, 6, 8]});    // >
    tiles[6] = createImage("6_curved_road_2_tile", {u1: [0, 1, 2, 4, 7], u2:[4, 5, 8], d1:[0, 1, 2, 3, 5, 8], d2:[3, 5, 7]});    // <
    tiles[7] = createImage("7_curved_road_3_tile", {u1: [3, 6, 8], u2:[4, 5, 8], d1:[0, 1, 2, 3, 5, 8], d2:[0, 1, 2, 4, 6, 8]});    // v
    tiles[8] = createImage("8_curved_road_4_tile", {u1: [0, 1, 2, 4, 7], u2:[0, 1, 2, 3, 6, 7], d1:[4, 6, 7], d2:[3, 5, 7]});    // ^
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

function randomArrayChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

function timedFill() {
	return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 20000);
  });
}

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
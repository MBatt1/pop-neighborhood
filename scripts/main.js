
var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");


var tiles = [];

var grid = [];
var frontier = [];

var ticker = null;

// Fill the grid with tiles
function fillGrid() {
	
	var screenTileWidth = canvas.width/100+1;
	var screenTileHeight = canvas.height/25+1;

    grid = [];
    // fill grid with emptys
    for (var yPlace = 0; yPlace < screenTileHeight+1; yPlace++) {
        var temp = [];
        for (var xPlace = 0; xPlace < screenTileWidth+1; xPlace++) {
            temp[xPlace] = -1;
        }
        grid[yPlace] = temp;
    }
    
    var startX = Math.floor((Math.random() * screenTileWidth-6)+3);
    var startY = Math.floor((Math.random() * screenTileHeight-6)+3);

    frontier = [{x:startX, y:startY}]
	grid[startY][startX] = 0;
    
   
    ticker = setInterval(advanceDraw, 50);
    
};

function advanceDraw() {
	if (frontier.length > 0) {
        var front = frontier.pop();
        var frontTile = tiles[grid[front.y][front.x]];
        if (!frontTile) {
            grid[front.y][front.x] = 0;
            drawGrid();
            return;
        }
        
		var upLeft = getUpLeft(front);
		var upRight = getUpRight(front);
		var downLeft = getDownLeft(front);
		var downRight = getDownRight(front);
		
		if (grid[upLeft.y] && grid[upLeft.y][upLeft.x] && getTile(grid, upLeft) == -1) {
            frontier.push({x:upLeft.x, y:upLeft.y});
			var newTiles = [...frontTile.validConnections.u1];
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(upLeft, temp)) {
					grid[upLeft.y][upLeft.x] = temp;
					foundTile = true;
				}
			}
		}
		if (grid[upRight.y] && grid[upRight.y][upRight.x] && getTile(grid, upRight) == -1) {
			frontier.push({x:upRight.x, y:upRight.y});
			var newTiles = [...frontTile.validConnections.u2];
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(upRight, temp)) {
					grid[upRight.y][upRight.x] = temp;
					foundTile = true;
				}
			}
		}
		if (grid[downLeft.y] && grid[downLeft.y][downLeft.x] && getTile(grid, downLeft) == -1) {
			frontier.push({x:downLeft.x, y:downLeft.y});
			var newTiles = [...frontTile.validConnections.d1];
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(downLeft, temp)) {
					grid[downLeft.y][downLeft.x] = temp;
					foundTile = true;
				}
			}
		}
		if (grid[downRight.y] && grid[downRight.y][downRight.x] && getTile(grid, downRight) == -1) {
			frontier.push({x:downRight.x, y:downRight.y});
			var newTiles = [...frontTile.validConnections.d2];
			newTiles.sort(() => Math.random() - 0.5);
			var foundTile = null;
			while (!foundTile && newTiles.length > 0) {
				var temp = newTiles.pop();
				if (tileFits(downRight, temp)) {
					grid[downRight.y][downRight.x] = temp;
					foundTile = true;
				}
			}
		}
		frontier.sort(() => Math.random() - 0.5);
		
		drawGrid();
    } else {
        clearInterval(ticker);
        setTimeout(reset, 5000);
    }
}

function reset() {
    ctx.clearRect(0, 0, canvas.width*2, canvas.height*2)
    fillGrid()
}

function tileFits(coords, tileIndex) {
	var upLeft = getUpLeft(coords);
	var upRight = getUpRight(coords);
	var downLeft = getDownLeft(coords);
	var downRight = getDownRight(coords);
	
	if (!(getTile(grid, upLeft) == -1 || getTile(grid, upLeft) == 99 || tiles[tileIndex].validConnections.u1.includes(getTile(grid, upLeft)))) {
		return false;
	}
	if (!(getTile(grid, upRight) == -1 || getTile(grid, upRight) == 99 || tiles[tileIndex].validConnections.u2.includes(getTile(grid, upRight)))) {
		return false;
	}
	if (!(getTile(grid, downLeft) == -1 || getTile(grid, downLeft) == 99 || tiles[tileIndex].validConnections.d1.includes(getTile(grid, downLeft)))) {
		return false;
	}
	if (!(getTile(grid, downRight) == -1 || getTile(grid, downRight) == 99 || tiles[tileIndex].validConnections.d2.includes(getTile(grid, downRight)))) {
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
    
	
	
    var upLeftRoad = [3, 20, 22, 6, 8, 9, 11, 12, 13, 18];
    var upLeftGrass = [0, 24, 25, 26, 27, 1, 2, 14, 15, 28, 29, 4, 21, 23, 5, 7, 10, 16, 17, 19];
    var upRightRoad = [4, 21, 23, 5, 8, 9, 10, 12, 13, 19];
    var upRightGrass = [0, 24, 25, 26, 27, 1, 2, 14, 15, 28, 29, 3, 20, 22, 6, 7, 11, 16, 17, 18];
    
    var downLeftRoad = [4, 21, 23, 6, 7, 9, 10, 11, 12, 17];
    var downLeftGrass = [0, 24, 25, 26, 27, 1, 2, 14, 15, 28, 29, 3, 20, 22, 5, 8, 13, 16, 18, 19];
    var downRightRoad = [3, 20, 22, 5, 7, 9, 10, 11, 13, 16];
    var downRightGrass = [0, 24, 25, 26, 27, 1, 2, 14, 15, 28, 29, 4, 21, 23, 6, 8, 12, 17, 18, 19];
    
    
    
    tiles[0] = createImage("0_blank_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[24] = createImage("24_blank_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[25] = createImage("25_blank_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[26] = createImage("26_blank_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[27] = createImage("27_blank_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
	
    tiles[1] = createImage("1_house_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[2] = createImage("2_house2_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[14] = createImage("14_house_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[15] = createImage("15_house2_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[28] = createImage("28_house_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    tiles[29] = createImage("29_house2_tile", {u1:upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
    
    tiles[3] = createImage("3_straight_road_1_tile", {u1: upLeftRoad, u2:upRightGrass, d1:downLeftGrass, d2:downRightRoad});  // 
    tiles[4] = createImage("4_straight_road_2_tile", {u1: upLeftGrass, u2:upRightRoad, d1:downLeftRoad, d2:downRightGrass});  // /
    tiles[20] = createImage("20_crosswalk_road_tile", {u1: upLeftRoad, u2:upRightGrass, d1:downLeftGrass, d2:downRightRoad});  // 
    tiles[21] = createImage("21_crosswalk_road_tile", {u1: upLeftGrass, u2:upRightRoad, d1:downLeftRoad, d2:downRightGrass});  // /
    tiles[22] = createImage("22_crosswalk_road_tile", {u1: upLeftRoad, u2:upRightGrass, d1:downLeftGrass, d2:downRightRoad});  // 
    tiles[23] = createImage("23_crosswalk_road_tile", {u1: upLeftGrass, u2:upRightRoad, d1:downLeftRoad, d2:downRightGrass});  // /
    
    tiles[5] = createImage("5_curved_road_1_tile", {u1: upLeftRoad, u2:upRightGrass, d1:downLeftRoad, d2:downRightGrass});    // >
    tiles[6] = createImage("6_curved_road_2_tile", {u1: upLeftGrass, u2:upRightRoad, d1:downLeftGrass, d2:downRightRoad});    // <
    tiles[7] = createImage("7_curved_road_3_tile", {u1: upLeftRoad, u2:upRightRoad, d1:downLeftGrass, d2:downRightGrass});    // v
    tiles[8] = createImage("8_curved_road_4_tile", {u1: upLeftGrass, u2:upRightGrass, d1:downLeftRoad, d2:downRightRoad});    // ^
    
    tiles[9] = createImage("9_fourway_road_tile", {u1: [3, 6, 8], u2:[4, 5, 8], d1:[4, 6, 7], d2:[3, 5, 7]});  // /
    
    tiles[10] = createImage("10_t_road_1_tile", {u1: upLeftRoad, u2:upRightRoad, d1:downLeftRoad, d2:downRightGrass});  //
    tiles[11] = createImage("11_t_road_2_tile", {u1: upLeftRoad, u2:upRightRoad, d1:downLeftGrass, d2:downRightRoad});  //
    tiles[12] = createImage("12_t_road_3_tile", {u1: upLeftGrass, u2:upRightRoad, d1:downLeftRoad, d2:downRightRoad});  //
    tiles[13] = createImage("13_t_road_4_tile", {u1: upLeftRoad, u2:upRightGrass, d1:downLeftRoad, d2:downRightRoad});  //
	
	tiles[16] = createImage("16_dead_end_road_tile", {u1: [3, 20, 22, 6, 8, 9, 11, 12, 13], u2:upRightGrass, d1:downLeftGrass, d2:downRightGrass});
	tiles[17] = createImage("17_dead_end_road_tile", {u1: upLeftGrass, u2:[4, 21, 23, 5, 8, 9, 10, 12, 1], d1:downLeftGrass, d2:downRightGrass});
	tiles[18] = createImage("18_dead_end_road_tile", {u1: upLeftGrass, u2:upRightGrass, d1:downLeftGrass, d2:[3, 20, 22, 5, 7, 9, 10, 11, 13]});
	tiles[19] = createImage("19_dead_end_road_tile", {u1: upLeftGrass, u2:upRightGrass, d1:[4, 21, 23, 6, 7, 9, 10, 11, 12], d2:downRightGrass});
    
    tiles[99] = createImage("bad_tile", {u1:[], u2:[], d1:[], d2:[]});
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
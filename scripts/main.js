var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

var blankImg = new Image();
blankImg.src = "tiles/blank_tile.png";
var houseImg = new Image();
houseImg.src = "tiles/house_tile.png";
var house2Img = new Image();
house2Img.src = "tiles/house2_tile.png";

for (var yPlace = 0; yPlace < 32; yPlace++) {
    for (var xPlace = 0; xPlace < 17; xPlace++) {
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
    
        }
    }
}
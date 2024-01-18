//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); 4 node

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.backgroundColor = "red";
        this.renderScale = 4;
        this.ctx.scale(this.renderScale, this.renderScale)
        this.movement = [false, false, false, false];
        this.scrollOffset = [0, 0];

        this.assets = { 
            "grass" : loadImages("tiles/grass", 9),
        };

        this.tileArray = Object.keys(this.assets);  
        this.tileType = 0;
        this.tileVariant = 0;

        this.tilemap = new Tilemap(this, this.ctx, this.canvas, 16);
    }

    run(){
        this.update();
        //remove testcode below this
        //game.tilemap.tilemap[`${x};${y}`] = {"type":"testTile", "variant": 0, "pos": [x, y]};
    }

    //main game loop
    update(){
        requestAnimationFrame(this.update.bind(this));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.imageSmoothingEnabled = false; //point clamp, crisp image, good 4 pixelart

        this.scrollOffset[0] += (this.movement[1] - this.movement[0]) * 2
        this.scrollOffset[1] += (this.movement[2] - this.movement[3]) * 2
        let renderScroll = [Math.round(this.scrollOffset[0]), Math.round(this.scrollOffset[1])]

        this.tilemap.draw(renderScroll);

        let selectedTileImage = this.assets[this.tileArray[this.tileType]][this.tileVariant];
        let mouseGridPos = [Math.floor((mousePos[0] + this.scrollOffset[0]) / this.tilemap.tileSize), Math.floor((mousePos[1] + this.scrollOffset[1]) / this.tilemap.tileSize)]
        this.ctx.globalAlpha = 0.4;
        this.ctx.drawImage(selectedTileImage, mouseGridPos[0] * this.tilemap.tileSize - this.scrollOffset[0], mouseGridPos[1] * this.tilemap.tileSize - this.scrollOffset[1], this.tilemap.tileSize, this.tilemap.tileSize);
        this.ctx.globalAlpha = 1;

        this.movement[0] = false;
        this.movement[1] = false;
        this.movement[2] = false;
        this.movement[3] = false;
        if(keys["a"]){
            this.movement[0] = true;
        }
        if(keys["d"]){
            this.movement[1] = true
        }
        if(keys["w"]){
            this.movement[2] = true;
        }
        if(keys["s"]){
            this.movement[3] = true
        }
    }
}

//fix this later vvvvvvvv
let keys = {};
let mousePos = [0, 0]
//^^^^^^^^^^^^^^^^^^
document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

document.addEventListener('mousemove', function(event) {
    mousePos[0] = Math.floor(event.clientX / game.renderScale);
    mousePos[1] = Math.floor(event.clientY / game.renderScale);
});

window.addEventListener('resize', function(event) {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    game.ctx.scale(game.renderScale, game.renderScale);
});

let game = new Game(document.getElementById("canvas"));
game.run();
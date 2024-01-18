//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); node

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;

        this.movement = [0, 0];
        this.scrollOffset = [0, 0];

        this.assets = { 
            "testTile" : loadImages("", 1),
        };

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

        let renderScroll = [Math.round(this.scrollOffset[0]), Math.round(this.scrollOffset)]

        this.tilemap.draw(renderScroll);

        this.movement[0] = false;
        this.movement[1] = false;
        if(keys["a"]){
            this.movement[0] = true;
        }
        if(keys["d"]){
            this.movement[1] = true
        }
    }
}

let keys = {};

document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

let game = new Game(document.getElementById("canvas"));
game.run();
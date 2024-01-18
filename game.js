//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); node

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;

        this.offset = [0, 0];

        this.assets = { 
            "testTile" : loadImages("", 1),
        };

        this.tilemap = new Tilemap(this, this.ctx, this.canvas, 16);
    }

    run(){
        this.update();
        //remove testcode below this
        this.tilemap["5;7"] = {"type": "testTile"};
    }

    //main game loop//main game loop//main game loop//main game loop
    update(){ //main game loop//main game loop//main game loop
        requestAnimationFrame(this.update.bind(this));
        this.tilemap.draw(this.offset);
    }
}

let game = new Game(document.getElementById("canvas"));
game.run();
for(let i = 0; i < 100; i++){
    let x = Math.floor(Math.random() * 50);
    let y = Math.floor(Math.random() * 50);
    game.tilemap.tilemap[`${x};${y}`] = {"type":"testTile", "variant": 0, "pos": [x, y]};
}
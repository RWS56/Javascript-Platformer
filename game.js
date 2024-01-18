//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); node

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

        this.assets = {
            "testTile" : loadImage("testTile.png"),
        };
    }

    run(){
        
    }
}

let game = new Game(document.getElementById("canvas"));
console.log(game.assets["testTile"]);

//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); 4 node

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderScale = 4;
        this.ctx.scale(this.renderScale, this.renderScale)
        this.isRunning = false;

        this.movement = [false, false];
        this.scrollOffset = [0, 0];

        this.keys = {};

        this.assets = { 
            "grass" : loadImages("tiles/grass", 9),
            "backgroundtest" : loadImage("backgroundtest.png")
        };

        this.tilemap = new Tilemap(this, this.ctx, this.canvas, 16, this.renderScale);
        this.tilemap.load();

        this.player = new Player(this, [160, 0], [16, 16]);
    }

    run(){
        this.isRunning = true;
        this.addListeners();
        this.update();
    }

    addListeners(){
        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });
        
        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;

            if(event.key === "o"){
                this.isSaving = false;
            }
        });
        
        window.addEventListener('resize', (event) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.ctx.scale(this.renderScale, this.renderScale);
        });

        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
    }

    exit(){
        this.isRunning = false;
    }

    //main game loop
    update(){
        if(this.isRunning){
            requestAnimationFrame(this.update.bind(this));
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.imageSmoothingEnabled = false; //point clamp, crisp image, good 4 pixelart     

        this.scrollOffset[0] += (this.player.rect().centerX - this.canvas.width / this.renderScale / 2 - this.scrollOffset[0]) / 30; //RÖR INTE MER, FUNAKR NU
        this.scrollOffset[1] += (this.player.rect().centerY - this.canvas.height / this.renderScale / 2 - this.scrollOffset[1]) / 30;
        let renderScroll = [Math.round(this.scrollOffset[0]), Math.round(this.scrollOffset[1])]

        this.ctx.drawImage(this.assets["backgroundtest"], 0, 0, 640, 420);
        this.tilemap.draw(renderScroll);

        this.player.update(this.tilemap, [this.movement[1] - this.movement[0], 0]);
        this.player.draw(this.assets.grass[4], this.ctx, renderScroll);

        this.movement[0] = false;
        this.movement[1] = false;

        if(this.keys["a"]){
            this.movement[0] = true;
        }
        if(this.keys["d"]){
            this.movement[1] = true;
        }
        if(this.keys["w"]){
            this.player.jump();
        }
    }
}

let game = new Game(document.getElementById("canvas"));
game.run();
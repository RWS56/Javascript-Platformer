//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); 4 node

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderScale = 4;
        this.ctx.scale(this.renderScale, this.renderScale)

        this.movement = [false, false, false, false];
        this.scrollOffset = [0, 0];
        this.mouseDown = false;
        this.rightClick = false;

        this.keys = {};
        this.mousePos = [0, 0]

        this.assets = { 
            "grass" : loadImages("tiles/grass", 9),
        };

        this.tileArray = Object.keys(this.assets);  
        this.tileType = 0;
        this.tileVariant = 0;

        this.tilemap = new Tilemap(this, this.ctx, this.canvas, 16, this.renderScale);
    }

    run(){
        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });
        
        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
        
        document.addEventListener('mousemove', (event) => {
            this.mousePos[0] = Math.floor(event.clientX / this.renderScale);
            this.mousePos[1] = Math.floor(event.clientY / this.renderScale);
        });
        
        document.addEventListener('mousedown', (event) => {
            if (event.button === 0){
                this.mouseDown = true;  
            }
            else if (event.button === 2){
                this.rightClick = true;  
            }
        });
        
        document.addEventListener('mouseup', (event) => {
            this.mouseDown = false;
            this.rightClick = false;
        });
        
        window.addEventListener('resize', (event) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.ctx.scale(this.renderScale, this.renderScale);
        });
        
        this.update();
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
        this.scrollOffset[1] += (this.movement[3] - this.movement[2]) * 2
        let renderScroll = [Math.round(this.scrollOffset[0]), Math.round(this.scrollOffset[1])]

        this.tilemap.draw(renderScroll);

        let selectedTileImage = this.assets[this.tileArray[this.tileType]][this.tileVariant];
        let mouseGridPos = [Math.floor((this.mousePos[0] + this.scrollOffset[0]) / this.tilemap.tileSize), Math.floor((this.mousePos[1] + this.scrollOffset[1]) / this.tilemap.tileSize)]
        this.ctx.globalAlpha = 0.45;
        this.ctx.drawImage(selectedTileImage, mouseGridPos[0] * this.tilemap.tileSize - this.scrollOffset[0], mouseGridPos[1] * this.tilemap.tileSize - this.scrollOffset[1], this.tilemap.tileSize, this.tilemap.tileSize);
        this.ctx.globalAlpha = 1;

        if(this.mouseDown){
            this.tilemap.tilemap[`${mouseGridPos[0]};${mouseGridPos[1]}`] = {"type": this.tileArray[this.tileType], "variant": this.tileVariant, "pos": mouseGridPos};
        }

        this.movement[0] = false;
        this.movement[1] = false;
        this.movement[2] = false;
        this.movement[3] = false;
        if(this.keys["a"]){
            this.movement[0] = true;
        }
        if(this.keys["d"]){
            this.movement[1] = true
        }
        if(this.keys["w"]){
            this.movement[2] = true;
        }
        if(this.keys["s"]){
            this.movement[3] = true
        }
        if(this.keys["t"]){
            this.tilemap.autoTile();
        }
        if(this.keys["o"]){
            this.tilemap.save();    
        }
    }
}

let game = new Game(document.getElementById("canvas"));
game.run();
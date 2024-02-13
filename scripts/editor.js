//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); 4 node

class Editor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderScale = 3;
        this.ctx.scale(this.renderScale, this.renderScale)

        this.movement = [false, false, false, false];
        this.scrollOffset = [0, 0];
        this.mouseDown = false;
        this.rightClick = false;

        this.keys = {};
        this.mousePos = [0, 0]

        this.isSaving = false;

        this.assets = {
            "grass": loadImages("tiles/grass", 9),
            "decor": loadImages("decor", 2),
        };

        this.tileArray = Object.keys(this.assets);
        this.tileType = 0;
        this.tileVariant = 0;

        this.tilemap = new Tilemap(this, this.ctx, this.canvas, 16, this.renderScale);
        this.tilemap.load();

        //Hackfix remove later on
        this.frameCounter = 0;

        this.onGrid = true;
    }

    run() {
        this.addListeners();

        this.update();
    }

    addListeners() {
        document.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;

            if (event.code === "KeyO") {
                this.isSaving = false;
            }
        });

        document.addEventListener('mousemove', (event) => {
            this.mousePos[0] = Math.floor(event.clientX / this.renderScale);
            this.mousePos[1] = Math.floor(event.clientY / this.renderScale);
        });

        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.mouseDown = true;
            }
            else if (event.button === 2) {
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

        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
    }

    //main game loop
    update() {
        requestAnimationFrame(this.update.bind(this));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.imageSmoothingEnabled = false; //point clamp, crisp image, good 4 pixelart

        this.scrollOffset[0] += (this.movement[1] - this.movement[0]) * 2;
        this.scrollOffset[1] += (this.movement[3] - this.movement[2]) * 2;
        let renderScroll = [Math.round(this.scrollOffset[0]), Math.round(this.scrollOffset[1])];

        this.tilemap.draw(renderScroll);

        let selectedTileImage = this.assets[this.tileArray[this.tileType]][this.tileVariant];
        let mouseGridPos = [Math.floor((this.mousePos[0] + this.scrollOffset[0]) / this.tilemap.tileSize), Math.floor((this.mousePos[1] + this.scrollOffset[1]) / this.tilemap.tileSize)];

        this.ctx.globalAlpha = 0.45;
        if (this.onGrid) {
            this.ctx.drawImage(selectedTileImage, mouseGridPos[0] * this.tilemap.tileSize - this.scrollOffset[0], mouseGridPos[1] * this.tilemap.tileSize - this.scrollOffset[1], selectedTileImage.width, selectedTileImage.height);
        }
        else {
            this.ctx.drawImage(selectedTileImage, this.mousePos[0], this.mousePos[1], selectedTileImage.width, selectedTileImage.height);
        }
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        if (this.onGrid) {
            if (this.mouseDown) {
                this.tilemap.tilemap[`${mouseGridPos[0]};${mouseGridPos[1]}`] = { "type": this.tileArray[this.tileType], "variant": this.tileVariant, "pos": mouseGridPos };
            }
            if (this.rightClick) {
                delete this.tilemap.tilemap[`${mouseGridPos[0]};${mouseGridPos[1]}`];
            }
        }
        else {
            if (this.mouseDown) {
                this.tilemap.offgridTiles[`${this.mousePos[0]};${this.mousePos[1]}`] = { "type": this.tileArray[this.tileType], "variant": this.tileVariant, "pos": this.mousePos };
            }
            if (this.rightClick) {
                delete this.tilemap.offgridTiles[`${this.mousePos[0]};${this.mousePos[1]}`];
            }
        }

        this.movement[0] = false;
        this.movement[1] = false;
        this.movement[2] = false;
        this.movement[3] = false;
        if (this.keys["KeyA"]) {
            this.movement[0] = true;
        }
        if (this.keys["KeyD"]) {
            this.movement[1] = true
        }
        if (this.keys["KeyW"]) {
            this.movement[2] = true;
        }
        if (this.keys["KeyS"]) {
            this.movement[3] = true;
        }
        if (this.keys["KeyT"]) {
            this.tilemap.autoTile();
        }
        if (this.keys["KeyO"] && !this.isSaving) {
            this.isSaving = true;
            this.tilemap.save();
        }
        if (this.keys["Minus"] && this.frameCounter === 0) { //Cringe amerikansk keyboard detta är +
            this.tileVariant = 0;
            this.tileType = (1 + this.tileType) % this.tileArray.length;
        }
        if (this.keys["Slash"] && this.frameCounter === 0) { //minus
            this.tileVariant = 0;
            this.tileType = (1 - this.tileType) % this.tileArray.length;
        }
        if (this.keys["ShiftLeft"] && this.frameCounter === 0) {
            this.tileVariant = (1 + this.tileVariant) % this.assets[this.tileArray[this.tileType]].length;
        }
        if (this.keys["KeyG"] && this.frameCounter === 0) {
            this.onGrid = !this.onGrid;
        }

        this.frameCounter++;
        if (this.frameCounter % 20 === 0) {
            this.frameCounter = 0;
        }
    }
}

let editor = new Editor(document.getElementById("canvas"));
editor.run();
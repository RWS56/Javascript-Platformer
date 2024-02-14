//const { Tilemap, neighborOffset } = require('./scripts/tilemap'); 4 node

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderScale = 3;
        this.ctx.scale(this.renderScale, this.renderScale)

        this.isRunning = false;

        this.movement = [false, false];

        this.mousePos = [0, 0];

        this.keys = {};

        this.assets = {
            "grass": loadImages("tiles/grass", 9),
            "backgroundtest": loadImage("backgroundtest.png"),
            "decor": loadImages("decor", 2),
            "player": loadImage("playerTest1.png"),
            "rifle": loadImage("rifletest.png"),
            "jumpAnim": new _Animation(loadImages("particles/jump", 5), 3)
        };

        this.sounds = {
            "jump": new Audio("data/sounds/jump.wav"),
        };
        this.masterVolume = 0.3; //mellan 0-1

        this.tilemap = new Tilemap(this, this.ctx, this.canvas, 16, this.renderScale);
        this.tilemap.load();

        this.player = new Player(this, [0, 0], [6, 16]);
        this.camera = new Camera(this, this.player);

        this.particleManager = new ParticleManager(this.ctx);
        this.FPS = 1000 / 60; //antalet ms per frame
        this.lastTime = Date.now();
    }

    run() {
        this.isRunning = true;
        this.addListeners();
        this.update();
    }

    addListeners() {
        document.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });

        document.addEventListener('mousemove', (event) => {
            this.mousePos[0] = Math.floor(event.clientX / this.renderScale);
            this.mousePos[1] = Math.floor(event.clientY / this.renderScale);
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

    exit() {
        this.isRunning = false;
    }

    //main game loop
    //Kom ihåg att dela icke tilemap bilder med renderscale
    update() {
        if (this.isRunning) {
            requestAnimationFrame(this.update.bind(this));
        }

        let currentTime = Date.now();
        let elapsed = currentTime - this.lastTime;

        if (elapsed > this.FPS) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.imageSmoothingEnabled = false; //point clamp, crisp image, good 4 pixelart     

            let renderScroll = this.camera.update();

            this.ctx.drawImage(this.assets["backgroundtest"], 0, 0, this.canvas.width / this.renderScale, this.canvas.height / this.renderScale);
            this.tilemap.draw(renderScroll);

            this.player.update(this.tilemap, [(this.movement[1] - this.movement[0]) * 1.45, 0]);
            this.player.draw(this.assets["player"], this.ctx, renderScroll, this.mousePos);

            this.particleManager.update();
            this.particleManager.draw(renderScroll);

            this.ctx.closePath();

            this.movement[0] = false;
            this.movement[1] = false;

            if (this.keys["KeyA"]) {
                this.movement[0] = true;
            }
            if (this.keys["KeyD"]) {
                this.movement[1] = true;
            }
            if (this.keys["Space"]) {
                this.player.jump();
            }
            if (this.keys["KeyP"]) {
                this.camera.screenShake(10, 7, 2);
            }

            //Testar lite kanske ta bort
            this.camera.offset[1] = 0;
            if (this.player.isGrounded && this.movement[0] + this.movement[1] === 0) //HAHAHAHA olaglig lösning, fixa senare
            {
                if (this.keys["KeyW"]) {
                    this.camera.offset[1] = this.canvas.height / this.renderScale / 2.5; //Påhittade siffror, alla älskar det. Men det funkar bra
                }
                if (this.keys["KeyS"]) {
                    this.camera.offset[1] = -this.canvas.height / this.renderScale / 2.5;
                }
            }

            this.lastTime = currentTime - (elapsed % this.FPS);
        }
    }
}
let game = new Game(document.getElementById("canvas"));
game.run();
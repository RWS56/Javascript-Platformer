class Camera {
    constructor(game, target) {
        this.game = game;
        this.target = target;
        this.position = [0, 0];
        this.offset = [0, 0];
        this.deltaMovement = 30; // hur många frames det tar för att nå target
    }

    update() {
        this.position[0] += (this.target.rect().centerX - this.game.canvas.width / this.game.renderScale / 2 - this.position[0] - this.offset[0]) / this.deltaMovement;
        this.position[1] += (this.target.rect().centerY - this.game.canvas.height / this.game.renderScale / 2 - this.position[1] - this.offset[1]) / this.deltaMovement;
        return [Math.round(this.position[0]), Math.round(this.position[1])];
    }

    screenShake(duration, amplitude, delta = 30) {
        let repeatScreenShake = setInterval(() => {
            if (duration === 0) {
                clearInterval(repeatScreenShake);
                this.offset = [0, 0]; // återställ
                this.deltaMovement = 30;
                return;
            }

            this.deltaMovement = delta;
            let angle = 2 * Math.PI * Math.random();
            this.offset[0] = amplitude * Math.cos(angle);
            this.offset[1] = amplitude * Math.sin(angle);

            duration--;
        }, this.game.FPS);
    }
}
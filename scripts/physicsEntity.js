class PhysicsEntity {
    constructor(game, entityType, position, size) {
        this.game = game;
        this.type = entityType;
        this.position = position;
        this.size = size;

        this.velocity = [0, 0];
        this.collision = { "up": false, "down": false, "left": false, "right": false };

        this.flip = false;
    }

    rect() {
        return new Rect(this.position[0], this.position[1], this.size[0], this.size[1]);
    }


    update(tilemap, movement = [0, 0]) {
        this.collision = { "up": false, "down": false, "left": false, "right": false };
        //Försöker applicera detta om ingen kollision upptäcks
        let assignedMovement = [movement[0] + this.velocity[0], movement[1] + this.velocity[1]];
        this.position[0] += assignedMovement[0];
        let myRect = this.rect();
        for (let rect of tilemap.getPhysicsRectAround(this.position)) {
            if (myRect.collision(rect)) {
                if (assignedMovement[0] > 0) {
                    myRect.x = rect.left - myRect.width;
                    this.collision["right"] = true;
                }
                if (assignedMovement[0] < 0) {
                    myRect.x = rect.right;
                    this.collision["left"] = true;
                }
                this.position[0] = myRect.x;
            }
        }
        this.position[1] += assignedMovement[1];
        myRect = this.rect();
        for (let rect of tilemap.getPhysicsRectAround(this.position)) {
            if (myRect.collision(rect)) {
                if (assignedMovement[1] > 0) {
                    myRect.y = rect.top - myRect.height;
                    this.collision["down"] = true;
                }
                if (assignedMovement[1] < 0) {
                    myRect.y = rect.bottom;
                    this.collision["up"] = true;
                }
                this.position[1] = myRect.y;
            }
        }

        if (assignedMovement[0] > 0) {
            this.flip = false;
        }
        if (assignedMovement[0] < 0) {
            this.flip = true;
        }

        this.velocity[1] = Math.min(5, this.velocity[1] + 0.1); // Bad Gravity, FIXFIXFIXFIX
        if (this.collision["down"] || this.collision["up"]) {
            this.velocity[1] = 0;
        }
    }

    draw(img, ctx, offset = [0, 0]) {
        if (this.flip) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(img, -(this.position[0] - offset[0] + img.width), this.position[1] - offset[1]);
            ctx.restore();
        }
        else {
            ctx.drawImage(img, this.position[0] - offset[0], this.position[1] - offset[1]);
        }

    }
}

class Player extends PhysicsEntity {
    constructor(game, position, size) {
        super(game, "player", position, size);
        this.airTime = 0;
        this.isGrounded = false;
        this.coyoteJumpThreshold = 15; // anges i frames
        this.currentWeapon = new Gun(game.assets.rifle, 16, 4, [3, 8], [-3, -2], "gun", 1, 30, [5, 5], game.projectileManager, null);
    }

    update(tilemap, movement = [0, 0]) {
        super.update(tilemap, movement);

        this.airTime++;
        if (this.collision["down"]) {
            this.airTime = 0;
            this.isGrounded = true;
        }
    }

    // testkod neda ta bort när stökigt
    draw(img, ctx, offset = [0, 0], mousePos) {
        super.draw(img, ctx, offset); //Eventuellt kolla dit vapnet är
        
        //draw currentWeapon
        ctx.save();
        let rotationPoint = [this.rect().left - offset[0] + this.currentWeapon.anchorPosition[0], this.rect().top - offset[1] + this.currentWeapon.anchorPosition[1]];
        ctx.translate(rotationPoint[0], rotationPoint[1]);
        let rotation = Math.atan2(mousePos[1] - rotationPoint[1], mousePos[0] - rotationPoint[0]); //ändra till bättre kod
        ctx.rotate(rotation);
        if (Math.abs(rotation) > Math.PI / 2) {
            ctx.scale(1, -1);
        }
        else {
            ctx.scale(1, 1);
        }
        ctx.translate(-rotationPoint[0], -rotationPoint[1]);
        ctx.drawImage(this.currentWeapon.image, rotationPoint[0] + this.currentWeapon.anchorOffset[0], rotationPoint[1] + this.currentWeapon.anchorOffset[1]); // ascursed
        ctx.restore();
    }
    //

    jump() {
        if (this.isGrounded && this.airTime < this.coyoteJumpThreshold) {
            this.velocity[1] = -2.5;
            this.isGrounded = false;
            this.game.sounds["jump"].volume = this.game.masterVolume;
            this.game.sounds["jump"].play();
            this.game.particleManager.addParticle(new AnimatedParticle(game.assets["jumpAnim"].copy(), [this.rect().left - 7, this.rect().bottom - 6], [0, 0], 15)); //ändra till bättre kod
        }
    }
}
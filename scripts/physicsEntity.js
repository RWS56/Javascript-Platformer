class PhysicsEntity{
    constructor(game, entityType, position, size){
        this.game = game;
        this.type = entityType;
        this.position = position;
        this.size = size;

        this.velocity = [0, 0];
        this.collision = {"up": false, "down": false, "left": false, "right": false};

        this.flip = false;
    }

    rect(){
        return new Rect(this.position[0], this.position[1], this.size[0], this.size[1]);
    }
    

    update(tilemap, movement = [0, 0]){
        this.collision = {"up": false, "down": false, "left": false, "right": false};
        //Försöker applicera detta om ingen kollision upptäcks
        let assignedMovement = [movement[0] + this.velocity[0], movement[1] + this.velocity[1]];
        this.position[0] += assignedMovement[0];
        let myRect = this.rect();
        for(let rect of tilemap.getPhysicsRectAround(this.position)){
            if(myRect.collision(rect)){
                if(assignedMovement[0] > 0){
                    myRect.x = rect.left - myRect.width;
                    this.collision["right"] = true;
                }
                if(assignedMovement[0] < 0){
                    myRect.x = rect.right;
                    this.collision["left"] = true;
                }
                this.position[0] = myRect.x;
            }
        }
        this.position[1] += assignedMovement[1];
        myRect = this.rect();
        for(let rect of tilemap.getPhysicsRectAround(this.position)){
            if(myRect.collision(rect)){
                if(assignedMovement[1] > 0){
                    myRect.y = rect.top - myRect.height;
                    this.collision["down"] = true;
                }
                if(assignedMovement[1] < 0){
                    myRect.y = rect.bottom;
                    this.collision["up"] = true;
                }
                this.position[1] = myRect.y;
            }
        }

        this.flip = movement[0] < 0; // må skapa lite problem, kolla på senare om fel upptäcks

        this.velocity[1] = Math.min(5, this.velocity[1] + 0.1); // Bad Gravity, FIXFIXFIXFIX
        if(this.collision["down"] || this.collision["up"]){
            this.velocity[1] = 0;
        }
    }

    draw(img, ctx, offset = [0, 0]){
        ctx.drawImage(img, this.position[0] - offset[0], this.position[1] - offset[1]);
    }
}

class Player extends PhysicsEntity{
    constructor(game, position, size) {
        super(game, "player", position, size);
        this.airTime = 0;
        this.isGrounded = false;
        this.coyoteJumpThreshold = 10; // anges i frames
    }

    update(tilemap, movement = [0, 0]){
        super.update(tilemap, movement);

        this.airTime++;
        if(this.collision["down"]){
            this.airTime = 0;
            this.isGrounded = true;
        }
    }

    jump(){
        if(this.isGrounded && this.airTime < this.coyoteJumpThreshold){
            this.velocity[1] = -2.5;
            this.isGrounded = false;
        }
    }
}
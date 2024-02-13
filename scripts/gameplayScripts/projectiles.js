class ProjectileManager{
    constructor(ctx){
        this.ctx = ctx;
        this.projectiles = [];
    }

    update(){
        let projectilesNextFrame = [];
        for(let i in this.projectiles){
            if(this.projectiles[i].update()){
                projectilesNextFrame.push(this.projectiles[i]);
                continue;
            }

            //eventuell hantering av döda fastän de borde hantera sig själva
        }
    }

    draw(offset) {
        for (let projectile of this.projectiles) {
            this.ctx.drawImage(projectile.image, projectile.position[0] - offset[0], projectile.position[1] - offset[1])
        }
    }

    addParticle(projectile) {
        this.projectiles.push(projectile);
    }
}

class Projectile{
    constructor(ctx, displayImage, pos, speed, direction, damage, lifetime = -1){
        this.ctx = ctx;
        this.image = displayImage;
        this.position = pos;
        this.speed = speed;
        this.direction = direction;
        this.damage = damage;
        this.lifetime = lifetime;
    }

    update(){
        this.position[0] += Math.cos(this.direction) * this.speed; //eventuellt gör dessa uträkningar i constructor ifall speed || direction ska vara konstant
        this.position[1] += Math.sin(this.direction) * this.speed;
    }
}
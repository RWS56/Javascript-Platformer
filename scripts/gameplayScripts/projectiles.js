class ProjectileManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.projectiles = [];
    }

    update() {
        let projectilesNextFrame = [];
        for (let i in this.projectiles) {
            if (this.projectiles[i].update()) {
                projectilesNextFrame.push(this.projectiles[i]);
                continue;
            }

            //eventuell hantering av döda fastän de borde hantera sig själva
        }

        this.projectiles = projectilesNextFrame;
    }

    draw(offset) {
        for (let projectile of this.projectiles) {
            //rotera projektilen rätt
            this.ctx.save();
            this.ctx.translate(projectile.rect().centerX, projectile.rect().centerY);
            this.ctx.rotate(projectile.rotation);
            this.ctx.translate(-projectile.rect().centerX, -projectile.rect().centerY);
            this.ctx.drawImage(projectile.image, projectile.position[0] - offset[0], projectile.position[1] - offset[1]);
            this.ctx.restore();
        }
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }
}

class Projectile {
    constructor(displayImage, pos, width, height, speed, direction, damage, lifetime = -1) {
        this.image = displayImage;
        this.position = pos;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.damage = damage;
        this.lifetime = lifetime;
    }

    update() {
        if (this.lifetime !== 0) {
            this.lifetime--;
            //eventuellt gör dessa uträkningar i constructor ifall speed || direction ska vara konstant
            this.position[0] += Math.cos(this.direction) * this.speed; 
            this.position[1] += Math.sin(this.direction) * this.speed;

            return true;
        }

        return false;
    }

    rect() {
        return new Rect(this.position[0], this.position[1], this.width, this.height);
    }

    copy(){
        //... gör att en referens inte skapas utan att en ny array(objekt) skapas
        return new Projectile(this.image, [...this.position], this.width, this.height, this.speed, this.direction, this.damage, this.lifetime); 
    }
}
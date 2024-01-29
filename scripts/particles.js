class ParticleManager{
    constructor(ctx){
        this.ctx = ctx;
        this.particles = [];
    }

    update(){
        for(let i in this.particles){
            if(this.particles[i].update()){
                continue;
            }

            this.particles.splice(i, 1);
        }
    }

    draw(offset){
        for(let particle of this.particles){
            this.ctx.drawImage(particle.image, particle.position[0] - offset[0], particle.position[1] - offset[1])
        }
    }

    addParticle(particle){
        this.particleManager.particles.push(particle);
    }
}

class Particle{
    constructor(image, position, velocity, duration){
        this.image = image;
        this.duration = duration;
        this.position = position;
        this.velocity = velocity;
    }

    update(){
        if(this.duration > 0){ //Fixa senar, gör bättre
            this.position[0] += this.velocity[0];
            this.position[1] += this.velocity[1];
            this.duration--;
            return true;
        }
        
        return false;
    }
}
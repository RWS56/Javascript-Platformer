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

            delete this.particles[i];
        }
    }

    draw(){
        for(let particle of particles){
            this.ctx.draw(particle.image, )
        }
    }
}

class Particle{
    constructor(manager, image, position, velocity, duration){
        this.image = image;
        this.duration = duration;
        this.position = position;
        this.velocity = velocity;

        manager.particles
    }

    update(){
        if(this.duration > 0){
            this.duration--;
            return true;
        }
        
        return false;
    }
}
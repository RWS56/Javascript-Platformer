class Weapon {
    constructor(image, type, damage, useTime) {
        this.image = image;
        this.type = type;
        this.damage = damage;
        this.useTime = useTime; // max väntetiden. Mäts i frames
        this.cooldown = 0; // används för att hålla redo på tiden tills man kan använda igen
    }

    onUse() {
        this.cooldown--;
        if (this.cooldown < 0) {
            this.cooldown = this.useTime;
            return;
        }
    }
}

class Gun extends Weapon {
    constructor(image, type, damage) {
        super(image, type, damage)
    }
}
class Weapon {
    constructor(image, width, height, anchor, type, damage, useTime) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.anchorPosition = anchor; // array ex [5, 5] där [0, 0] är player.rect.top och left
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
    constructor(image, type, damage, useTime) {
        super(image, type, damage, useTime);
    }
}
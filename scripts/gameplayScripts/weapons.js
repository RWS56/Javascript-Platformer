class Weapon {
    constructor(image, width, height, anchor, anchorOffset, type, damage, useTime) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.anchorPosition = anchor; // array ex [5, 5] där [0, 0] är player.rect.top och left¨
        this.anchorOffset = anchorOffset; // för att flytta in anchorpointent till en mer realistisk plats då vapnet ritas
        this.type = type;
        this.damage = damage;
        this.useTime = useTime; // max väntetiden. Mäts i frames
        this.cooldown = 0; // används för att hålla redo på tiden tills man kan använda igen
    }

    //ja vet ick om ja ska använda en sådan eller bara ta dess variabler och göra allt när jag ritar player

    onUse() { // vid närmare eftertanke hanterar vi detta i main loopen
        /*this.cooldown--;
        if (this.cooldown < 0) {
            this.cooldown = this.useTime;
            return;
        }*/


    }
}

class Gun extends Weapon {
    constructor(image, width, height, anchor, anchorOffset, type, damage, useTime, shootPoint, projectilemanager, projectile) {
        super(image, width, height, anchor, anchorOffset, type, damage, useTime);
        this.shootPoint = shootPoint;
        this.projectileManager = projectilemanager;
        this.projectile = projectile;
    }

    onUse() {
        super.onUse()
        this.projectileManager.addProjectile(this.projectile);
    }
}
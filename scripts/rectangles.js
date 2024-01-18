class Rect{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collision(otherRect){
        return(
            this.x < otherRect.x + otherRect.width &&
            this.x + this.width > otherRect.x &&
            this.y < otherRect.y + otherRect.height &&
            this.y + this.height > otherRect.y
        );
    }

    getArea(){
        return (this.width-this.x) * (this.height-this.y);
    }
}
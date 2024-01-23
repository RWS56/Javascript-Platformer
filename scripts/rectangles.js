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

    get area(){
        return (this.width) * (this.height);
    }

    get right(){
        return this.x + this.width;
    }
    
    get left(){
        return this.x;
    }

    get top(){
        return this.y;
    }

    get bottom(){
        return this.y + this.height;
    }

    get centerX(){
        return  (x + this.width) / 2;
    }

    get centerY(){
        return (y + this.height) / 2;
    }
}
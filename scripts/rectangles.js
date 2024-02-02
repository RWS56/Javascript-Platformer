class Rect {
    constructor(x, y, width, height, origin = [0, 0]) {
        this.x = x + origin[0];
        this.y = y + origin[1];
        this.width = width;
        this.height = height;
        this.origin = origin;
    }

    collision(otherRect) {
        return (
            this.x < otherRect.x + otherRect.width &&
            this.x + this.width > otherRect.x &&
            this.y < otherRect.y + otherRect.height &&
            this.y + this.height > otherRect.y
        );
    }

    get area() {
        return (this.width) * (this.height);
    }

    get right() {
        return this.x + this.width;
    }

    get left() {
        return this.x - this.origin[0];
    }

    get top() {
        return this.y - this.origin[1];
    }

    get bottom() {
        return this.y + this.height;
    }

    get centerX() {
        return this.x + this.width / 2;
    }

    get centerY() {
        return this.y + this.height / 2;
    }
}
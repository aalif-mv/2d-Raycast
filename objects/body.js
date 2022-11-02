class Body {
    constructor(angle) {
        this.vertices = [];
        this.sides = [];
        this.angle = angle;
    }
    draw(color) {
        for (let i = 0; i < this.sides.length; i++) {
            this.sides[i].draw(color);
        }
    }
}
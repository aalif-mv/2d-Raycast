class Wall extends Body {
    constructor(x1, y1, x2, y2, angle = 0) {
        super(angle);

        this.vertices[0] = {x: x1, y: y1};
        this.vertices[1] = {x: x2, y: y2};

        this.sides[0] = new Line(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y);
    }
}
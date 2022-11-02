class Box extends Body {
    constructor(x, y, width, height, angle = 0) {
        super(angle);
        this.angle = 0;
        this.vertices[0] = {x: x, y: y}; // top left
        this.vertices[1] = {x: x + width, y: y}; // top right
        this.vertices[2] = {x: x, y: y + height}; // bottom left
        this.vertices[3] = {x: x + width, y: y + height}; // bottom right

        this.sides[0] = new Line(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y); // top
        this.sides[1] = new Line(this.vertices[0].x, this.vertices[0].y, this.vertices[2].x, this.vertices[2].y); // left
        this.sides[2] = new Line(this.vertices[2].x, this.vertices[2].y, this.vertices[3].x, this.vertices[3].y); // bottom
        this.sides[3] = new Line(this.vertices[1].x, this.vertices[1].y, this.vertices[3].x, this.vertices[3].y); // right
    }
}
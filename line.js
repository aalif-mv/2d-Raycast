class Line {
    constructor(x1, y1, x2, y2) {
        this.p1 = new Vector2(x1, y1);
        this.p2 = new Vector2(x2, y2);
        this.gradient = (y2 - y1) / (x2 - x1);
    }
    draw(color) {
        CTX.beginPath();
        CTX.moveTo(this.p1.x, this.p1.y);
        CTX.lineTo(this.p2.x, this.p2.y);
        CTX.strokeStyle = color;
        CTX.stroke();
    }
}
class Ray {
    constructor(posX, posY, dirX, dirY, angle) {
        this.position = new Vector2(posX, posY);
        this.direction = new Vector2(dirX, dirY);
        this.dLen = 15;
        this.angle = angle;
        this.acceleration = new Vector2(dirX, dirY);
        this.speed = 0;
        this.rotationSpeed = 0.02;
        this.friction = 0.68;
    }
    draw() {
        CTX.beginPath();
        CTX.strokeStyle = 'black';
        CTX.moveTo(this.position.x, this.position.y);
        CTX.lineTo(this.position.x + this.direction.x * this.dLen, this.position.y + this.direction.y * this.dLen);
        CTX.stroke();
        CTX.closePath();
    }
    pointTo(x, y) {
        const mouse = new Vector2(x, y);
        mouse.minus(this.position);
        this.direction = Vector2.unit(mouse);
    }
    cast(line) {
        const x1 = line.p1.x;
        const y1 = line.p1.y;
        const x2 = line.p2.x;
        const y2 = line.p2.y;

        const x3 = this.position.x;
        const y3 = this.position.y;
        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den === 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4))/den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))/den;

        if (t > 0 && t < 1 && u > 0) {
            const pt = new Vector2();
            pt.x = (x1 + t * (x2 - x1));
            pt.y = (y1 + t * (y2 - y1));
            return pt;
        } else {
            return;
        }
    }
    static drawPoints(v, r) {
        CTX.beginPath();
        CTX.arc(v.x, v.y, r, 0, Math.PI * 2);
        CTX.fill();
    }
    static drawLines(v1, v2) {
        CTX.beginPath();
        CTX.moveTo(v1.x, v1.y);
        CTX.lineTo(v2.x, v2.y);
        CTX.strokeStyle = 'blue';
        CTX.stroke();
    }
}
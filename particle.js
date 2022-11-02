class Particle {
    constructor(pos, density = 10, fov = 45, angle = 0) {
        this.position = pos;
        this.acceleration = new Vector2();
        this.angle = angle;
        this.speed = 0;
        this.rays = [];
        this.fov = fov;
        this.density = density;
        this.rotationSpeed = 0.02;
        this.friction = 0.68;

        for (let i = 0, ang = this.angle -toRadians(this.fov / 2); i < this.density; i++, ang += toRadians(this.fov / this.density)) {
            this.rays.push(new Ray(this.position.x, this.position.y, Math.cos(ang), Math.sin(ang), ang));
        }
    }
    move() {
        if (keyMap.get('W')) {
            this.speed = 1;
        }
        if (keyMap.get('S')) {
            this.speed = -1;
        }
        if (keyMap.get('A')) {
            this.rotationSpeed += 0.001;
            this.angle -= this.rotationSpeed;
        }
        if (keyMap.get('D')) {
            this.rotationSpeed += 0.001;
            this.angle += this.rotationSpeed;
        }
        if (! keyMap.get('A') && ! keyMap.get('D')) {
            this.rotationSpeed = 0.02;
        }
        // 
        this.angle = adjustAngle(this.angle);
        // 
        this.acceleration.multiplyScaler(this.friction);
        this.acceleration.x += (this.speed * Math.cos(this.angle));
        this.acceleration.y += (this.speed * Math.sin(this.angle));
        this.speed *= this.friction;
        this.position.add(this.acceleration);
        // 
        for (let i = 0, ang = this.angle -toRadians(this.fov / 2); i < this.rays.length; i++, ang += toRadians(this.fov / this.density)) {
            this.rays[i].position = this.position;
            this.rays[i].direction.x = Math.cos(ang);
            this.rays[i].direction.y = Math.sin(ang);
            this.rays[i].angle = (Math.atan2((this.rays[i].direction.y +  this.position.y) - this.position.y, (this.rays[i].direction.x +  this.position.x) - this.position.x));
            this.rays[i].draw();
        }
        // console.log(toDegrees(this.rays[this.rays.length - 1].angle))
        CTX.beginPath();
        CTX.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
        CTX.fill()
        CTX.beginPath();
        CTX.moveTo(this.position.x, this.position.y);
        CTX.lineTo(this.position.x + this.acceleration.x * 10, this.position.y + this.acceleration.y * 10);
        CTX.strokeStyle = 'green';
        CTX.lineWidth = 4;
        CTX.stroke();
        CTX.lineWidth = 1;
    }
    look(lines) {
        for (const ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (const line of lines) {
                let point = ray.cast(line);
                if (point != undefined) {
                    const distance = Vector2.mag(Vector2.minus(this.position, point));
                    if (distance < record) {
                        record = distance;
                        closest = point;
                    }
                }
            }
            if (closest != null) {
                // Ray.drawPoints(closest, 2);
                Ray.drawLines(this.position, closest);
            }
        }
    }
}
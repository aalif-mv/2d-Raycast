class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    addScaler(s) {
        this.x += s;
        this.y += s;
    }
    minusScaler(s) {
        this.x -= s;
        this.y -= s;
    }
    multiplyScaler(s) {
        this.x *= s;
        this.y *= s;
    }
    divideScaler(s) {
        this.x /= s;
        this.y /= s;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    minus(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
    }
    mag() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
    normal(){
        this.y = -this.y;
        this.unit();
    }

    unit(){
        const m = this.mag()
        if (m === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x /= m;
            this.y /= m;
        }
    }

    // static functions
    static addScaler(v1, s) {
        let x = v1.x + s;
        let y = v1.y + s;
        return new Vector2(x, y);
    }
    static minusScaler(v1, s) {
        let x = v1.x - s;
        let y = v1.y - s;
        return new Vector2(x, y);
    }
    static multiplyScaler(v1, s) {
        let x = v1.x * s;
        let y = v1.y * s;
        return new Vector2(x, y);
    }
    static divideScaler(v1, s) {
        let x = v1.x / s;
        let y = v1.y / s;
        return new Vector2(x, y);
    }
    static add(v1, v2) {
        let x = v1.x + v2.x;
        let y = v1.y + v2.y;
        return new Vector2(x, y);
    }
    static minus(v1, v2) {
        let x = v1.x - v2.x;
        let y = v1.y - v2.y;
        return new Vector2(x, y);
    }
    static multiply(v1, v2) {
        let x = v1.x * v2.x;
        let y = v1.y * v2.y;
        return new Vector2(x, y);
    }
    static divide(v1, v2) {
        let x = v1.x / v2.x;
        let y = v1.y / v2.y;
        return new Vector2(x, y);
    }
    static mag(v) {
        return Math.sqrt(v.x**2 + v.y**2);
    }
    static normal(v){
        let norm = new Vector(-v.y, v.x);
        norm.unit();
        return norm;
    }

    static unit(){
        const m = v.mag()
        if (m === 0) {
            return new Vector2(0, 0);
        } else {
            let x = v.x / m;
            let y = v.y / m;
            return new Vector2(x, y);
        }
    }
    static dot(v1, v2){
        return v1.x*v2.x + v1.y*v2.y;
    }

    static cross(v1, v2){
        return v1.x*v2.y - v1.y*v2.x;
    }
}
const canvas = document.getElementById('canvas');
const CTX = canvas.getContext('2d');

const Obstacles = [];
const particle = new Particle(new Vector2(200, 200), 100, 90, 0); // 500 max performance density
const keyMap = new Map();

let No = 10;
let mouse = new Vector2()

draw_Obstacles = function() {
    for (let i = 0; i < Obstacles.length; i++) {
        Obstacles[i].draw('black');
    }
}
init = function() {
    Obstacles.push(new Wall(0, 0, canvas.width, 0)); // top
    Obstacles.push(new Wall(0, canvas.height, canvas.width, canvas.height)); // bottom
    Obstacles.push(new Wall(0, 0, 0, canvas.height)); // left
    Obstacles.push(new Wall(canvas.width, 0, canvas.width, canvas.height)); // right

    for (let i = 0; i < No; i++) {
        // Obstacles.push(new Wall(random(1, 799), random(1, 599), random(1, 799), random(1, 599)));
        Obstacles.push(new Box(random(10, 600), random(10, 400), random(20, 100), random(20, 100)));
    }


    engine.start();
    // requestAnimationFrame(mainLoop);
}


mainLoop = function() {
    CTX.clearRect(0, 0, canvas.width, canvas.height);
    Performance.start();
    const particleFovAngles = {fr: particle.rays[0].angle, lr: particle.rays[particle.rays.length - 1].angle};
    let lines = [];
    let outerRays = [particle.rays[0], particle.rays[particle.rays.length - 1]];
    for (const obstacle of Obstacles) {
        let state = false;
        for (const vertices of obstacle.vertices) {
            const ang = (Math.atan2(vertices.y - particle.position.y, vertices.x - particle.position.x));

            for (const side of obstacle.sides) {
                if ((((particleFovAngles.lr <= -Math.PI + toRadians(particle.fov)) && (ang >= particleFovAngles.fr || ang <= particleFovAngles.lr)) || (ang >= particleFovAngles.fr && ang <= particleFovAngles.lr)) || (outerRays[0].cast(side) != undefined || outerRays[1].cast(side) != undefined)) {
                    state = true;
                    break;
                }
                state = false;
            }
            if (state) {
                break;
            }
        }
        if (! state) {
            continue;
        }
        switch (obstacle.constructor.name) {
            case 'Box':
                let topBottom = (obstacle.vertices[0].y < particle.position.y && obstacle.vertices[2].y > particle.position.y);
                let leftRight = (obstacle.vertices[0].x < particle.position.x && obstacle.vertices[1].x > particle.position.x);
                const distances = {};
                let final = [];
                if (!(topBottom && leftRight)) {
                    distances[(Vector2.mag(Vector2.minus(particle.position, obstacle.vertices[0]))) + ''] = obstacle.vertices[0];
                    distances[(Vector2.mag(Vector2.minus(particle.position, obstacle.vertices[1]))) + ''] = obstacle.vertices[1];
                    distances[(Vector2.mag(Vector2.minus(particle.position, obstacle.vertices[2]))) + ''] = obstacle.vertices[2];
                    distances[(Vector2.mag(Vector2.minus(particle.position, obstacle.vertices[3]))) + ''] = obstacle.vertices[3];
                    let max = Math.max(...Object.keys(distances));
                    for (const side of obstacle.sides) {
                        if (!(side.p1.x == distances[max].x && side.p1.y == distances[max].y || side.p2.x == distances[max].x && side.p2.y == distances[max].y)) {
                            final.push(side);
                        }
                    }
                } else {
                    lines = lines.concat(obstacle.sides);
                    break;
                }
                lines = lines.concat(final);
                break;
        
            default:
                lines = lines.concat(obstacle.sides);
                break;
        }
    }
    particle.look(lines);
    Performance.end();
    particle.move();
    draw_Obstacles();
    // requestAnimationFrame(mainLoop);
}


const engine = new Engine(60, mainLoop);


window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - canvas.offsetLeft;
    mouse.y = e.clientY - canvas.offsetTop;
    // ray.pointTo(x, y);
});
window.addEventListener('keydown', (e) => {
    keyMap.set(e.key.toUpperCase(), e.type === "keydown");
});
window.addEventListener('keyup', (e) => {
    keyMap.set(e.key.toUpperCase(), !(e.type === "keyup"));
});

init();
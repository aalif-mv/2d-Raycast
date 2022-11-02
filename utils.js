function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function adjustAngle(ang) {
    let angle = 0;
    if (ang <= -Math.PI) {
        angle = Math.PI;
    } else if (ang > Math.PI) {
        angle = -Math.PI;
    } else {
        angle = ang;
    }
    return angle;
}
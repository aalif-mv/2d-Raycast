class Engine {
    constructor(fps, update) {
        this.fpsInterval = 1000 / fps;
        this.update = update;
        this.timeNow = null;
        this.timeThen = null;
    }
    mainLoop() {
        requestAnimationFrame(() => {this.mainLoop()});
        this.timeNow = performance.now();
        let elapsed = this.timeNow - this.timeThen;

        if (elapsed > this.fpsInterval) {
            this.timeThen = this.timeNow - (elapsed % this.fpsInterval);

            // Code here
            this.update();
        }
    }
    start() {
        requestAnimationFrame(() => {this.mainLoop()});
    }
}
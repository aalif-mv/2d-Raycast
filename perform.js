class Performance {
    static sTime = null;
    static eTime = null;
    static result = null;
    static average = [];

    static start() {
        Performance.sTime = performance.now();
    }
    static end() {
        Performance.eTime = performance.now();
        Performance.result = Performance.eTime - Performance.sTime;
        Performance.average.push(Performance.result);
        if (Performance.average.length >= 2000) {
            Performance.logAverage();
        }
    }
    static log() {
        console.log(Performance.result);
    }
    static logAverage() {
        let total = 0
        for (const res of Performance.average) {
            total += res;
        }
        console.log(total / Performance.average.length);
        Performance.reset();
    }
    static reset() {
        Performance.sTime = null;
        Performance.eTime = null;
        Performance.result = null;
        Performance.average = [];
    }
}
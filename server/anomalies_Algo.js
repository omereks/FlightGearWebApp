const { report } = require("./app");

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {return this.x; }
    getY() { return this.y; }
}
class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    f(x) {
        return this.a * x + this.b;
    }
}
class Circle {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }
}

function avg(x, size) {
    let sum = 0;
    for (let i = 0; i < size; i++) {
        sum += parseFloat(x[i]);
    }
    if (size * sum === 0) {
        return 0;
    }
    return sum / size;
}
function vars(x, size) {
    let av = avg(x, size);
    let sum = 0;
    for (let i = 0; i < size; i++) {
        let temp = Math.pow(parseFloat(x[i]), 2);
        sum += temp;
    }
    let val = sum / size;
    return val - (av * av);
}
function cov(x, y, size) {
    let covar, sum = 0;
    for (let i = 0; i < size; i++) {
        sum += (parseFloat(x[i]) - avg(x, size)) * (parseFloat(y[i]) - avg(y, size));
    }
    covar = sum / size;
    return covar;
}
function pearson(x, y, size) {
    /*let t = Math.sqrt(vars(x, size)) * Math.sqrt(vars(y, size));
    let temp = cov(x, y, size) / x;
    return temp;*/
    let result = cov(x, y, size) / (Math.sqrt(vars(x, size)) * Math.sqrt(vars(y, size)));
    return result;
}
function linear_reg(points, size) {
    let a, b;
    let x = [];
    let y = [];
    for (let i = 0; i < size; i++) {
        x[i] = points[i].x;
        y[i] = points[i].y;
    }
    a = cov(x, y, size) / vars(x, size);
    b = avg(y, size) - a * avg(x, size);
    return new Line(a, b);
}
function dev(p, l) {
    let fx;
    fx = l.f(p.x);
    return Math.abs(fx - p.y);
}
function dist(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
function trivialCircle2(p1, p2) {
    let radius = dist(p1, p2) / 2;
    let cx = (p1.x + p2.x) / 2;
    let cy = (p1.y + p2.y) / 2;
    let center = new Point(cx, cy);
    return new Circle(center, radius);
}
function trivialCircle3(p1, p2, p3) {
    let bx = p2.x - p1.x;
    let by = p2.y - p1.y;
    let cx = p3.x - p1.x;
    let cy = p3.y - p1.y;

    let B = bx * bx + by * by;
    let C = cx * cx + cy * cy;
    let D = bx * cy - by * cx;

    let centerX = (cy * B - by * C) / (2 * D) + p1.x;
    let centerY = (bx * C - cx * B) / (2 * D) + p1.y;

    let center = new Point(centerX, centerY);
    let radius = dist(center, p1);
    return new Circle(center, radius);
}
function trivial(P) {
    if (P.length === 0)
        return new Circle(new Point(0, 0), 0);
    else if (P.length === 1)
        return new Circle(P[0], 0);
    else if (P.length === 2)
        return trivialCircle2(P[0], P[1]);

    // maybe 2 of the points define a small circle that contains the 3ed point
    let c = trivialCircle2(P[0], P[1]);
    if (dist(P[2], c.center) <= c.radius)
        return c;
    c = trivialCircle2(P[0], P[2]);
    if (dist(P[1], c.center) <= c.radius)
        return c;
    c = trivialCircle2(P[1], P[2]);
    if (dist(P[0], c.center) <= c.radius)
        return c;
    // else find the unique circle from 3 points
    return trivialCircle3(P[0], P[1], P[2]);
}
function minds(P, R, n) {
    let element;
    if (n === 0 || R.length === 3) {
        return trivial(R);
    }
    let i = Math.floor(Math.random() * n);

    //console.log("P Grand: ", P);
    //console.log("p x: ", i);

    let p = new Point(parseFloat(P[i].x), parseFloat(P[i].y));
    element = P[i];
    P[i] = P[n - 1];
    P[n - 1] = element;

    let c = minds(P, R, n - 1);

    if (dist(p, c.center) <= c.radius)
        return c;

    R.push(p);

    return minds(P, R, n - 1);
}
function findMinCircle(points, size) {
    return minds(points, [], size);
}

class TimeSeries {
    constructor(arr) {
        this.features = arr[0];
        this.csvMatrix = arr;
    }

    // method returns specific vector of given feature from the matrix
    getFeatureVector(x) {
        let line = [];
        for (let i = 1; i < this.csvMatrix.length; i++) { // to do changed index to 1
            line.push(this.csvMatrix[i][x]);
        }
        return line;
    }

    getFeatures() {
        return this.features;
    }

    // method get a feature string and returns its index
    getFeatureNum(featureName) {
        for (let i = 0; i < this.features.length; i++) {
            if (this.features[i] == featureName) {
                return i;
            }
        }
    }
}

class AnomalyReport {
    constructor(description, timeStep) {
        this.description = description;
        this.timeStep = timeStep;
    }
}

/*class TimeSeriesAnomalyDetector {
    constructor() { }
    // todo learn normal

}*/

class correlatedFeatures {
    constructor() {
        this.corrlation = 0;
        this.feature1 = '';
        this.feature2 = '';
        this.line_reg = 0;
        this.isStrongCorrelation = false;
        this.minimumCircle = 0;
        this.threshold = 0;
    }
}

class SimpleAnomalyDetector {
    constructor() {
        this.cf = [];
        this.correlationForDetect = null;
    }

    findThreshold(size, points) {
        let linearRegression = linear_reg(points, size);
        let finalDev = 0;
        let tempDev;
        for (let i = 0; i < size; i++) {
            let p = new Point(points[i].x, points[i].y);
            tempDev = dev(p, linearRegression);
            finalDev = Math.max(tempDev, finalDev);
        }
        return finalDev *= 1.1;
    }

    learnNormal(timeSeries, hybridOrReg) {
        if (hybridOrReg == "hybrid") {
            this.correlationForDetect = 0.5;
        } else {
            this.correlationForDetect = 0.9;
        }
        let numOfFeatures = timeSeries.getFeatures().length;
        let numOfLines = timeSeries.getFeatureVector(0).length;
        for (let i = 0; i < numOfFeatures; i++) {
            
            let currentCF = new correlatedFeatures();
            currentCF.corrlation = 0;
            let featureVector1 = timeSeries.getFeatureVector(i);
            for (let j = i + 1; j < numOfFeatures; j++) {
                let featureVector2 = timeSeries.getFeatureVector(j);
                let currentPearson = pearson(featureVector1, featureVector2, numOfLines);
                if ((currentCF.corrlation < currentPearson) && (this.correlationForDetect <= currentPearson)) { // todo here the difference between hybrid and regression
                    let points = [];
                    for (let x = 0; x < numOfLines; x++) {
                        points.push(new Point(timeSeries.getFeatureVector(i)[x], timeSeries.getFeatureVector(j)[x]));
                    }
                    if (0.9 <= currentPearson) {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.line_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = true;
                        currentCF.threshold = this.findThreshold(numOfLines, points);
                    } else {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.lin_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = false;
                        currentCF.minimumCircle = findMinCircle(points, numOfLines);
                        currentCF.threshold = currentCF.minimumCircle.radius * 1.1;
                    }
                }
            }
            if (this.correlationForDetect <= currentCF.corrlation) { this.cf.push(currentCF); }
        }
    }

    detect(timeSeries) {
        let reports = [];
        for (let i = 0; i < this.cf.length; i++) {
            let numOfFeature1 = timeSeries.getFeatureNum(this.cf[i].feature1);
            let numOfFeature2 = timeSeries.getFeatureNum(this.cf[i].feature2);
            let featureVector1 = timeSeries.getFeatureVector(numOfFeature1);
            let featureVector2 = timeSeries.getFeatureVector(numOfFeature2);
            if (this.cf[i].isStrongCorrelation) {
                for (let j = 1; j < featureVector1.length; j++) {
                    let p = new Point(featureVector1[j], featureVector2[j]);
                    let deviation = dev(p, this.cf[i].line_reg);
                    if (this.cf[i].threshold < deviation) {
                        let description = this.cf[i].feature1 + "-" + this.cf[i].feature2;
                        reports.push(new AnomalyReport(description, j + 1));
                    }
                }
                // if feature has a weak correlation
            } else {
                for (let j = 0; j < featureVector1.length; j++) {
                    let p = new Point(featureVector1[j], featureVector2[j]);
                    let centerOfCircle = this.cf[i].minimumCircle.center;
                    let deviation = this.getDistance(p, centerOfCircle);
                    if (this.cf[i].threshold < deviation) {
                        let description = this.cf[i].feature1 + "-" + this.cf[i].feature2;
                        reports.push_back(new AnomalyReport(description, j + 1)); // todo maybe j without +1
                    }
                }
            }
        }
        return reports;
    }

    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    getNormalModel() {
        return this.cf;
    }
}


function learnAlgo(LearnArr, DetectArr, model_type) {
    console.error("Start Learn Algo")
    let learnTs = new TimeSeries(LearnArr);
    let detectTs = new TimeSeries(DetectArr);
    let detector = new SimpleAnomalyDetector();
    detector.learnNormal(learnTs, model_type);
    let reports = detector.detect(detectTs);
    // convert reports into wanted format of [[13, "Aileron - Degree"], [68, "Latitude - Compass Degree"]]
    let result = [];
    for (let i = 0; i < reports.length; i++) {
        let anomaly = [];
        anomaly.push(reports[i].timeStep);
        anomaly.push(reports[i].description);
        result.push(anomaly);
    }
    return result
}
module.exports.learnAlgo = learnAlgo

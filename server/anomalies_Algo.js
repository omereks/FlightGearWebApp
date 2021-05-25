const { report } = require("./app");

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
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
        sum += x[i];
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
        let temp = Math.pow(x[i], 2);
        sum += temp;
    }
    let val = sum / size;
    return val - (av * av);
}
function cov(x, y, size) {
    let covar, sum = 0;
    for (let i = 0; i < size; i++) {
        sum += (x[i] - avg(x, size)) * (y[i] - avg(y, size));
    }
    covar = sum / size;
    return covar;
}
function pearson(x, y, size) {
    let t = Math.sqrt(vars(x, size)) * Math.sqrt(vars(y, size));
    let temp = cov(x, y, size) / x;
    return temp;
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
    if (P.size() === 0)
        return new Circle(new Point(0, 0), 0);
    else if (P.size() === 1)
        return new Circle(P[0], 0);
    else if (P.size() === 2)
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
    if (n === 0 || R.size() === 3) {
        return trivial(R);
    }

    // remove random point p
    // swap is more efficient than remove
    //srand (time(NULL));
    let i = Math.random() % n;
    let p = new Point(P[i].x, P[i].y);
    element = P[i];
    P[i] = P[n - 1];
    P[n - 1] = element;
    // swap(P[i],P[n-1]);

    let c = minds(P, R, n - 1);

    if (dist(p, c.center) <= c.radius)
        return c;

    R.push(p);

    return minds(P, R, n - 1);
}
function findMinCircle(points, size) {
    return minds(points, {}, size);
}

class TimeSeries {
    constructor(arr) {
        this.features = arr[0];
        this.csvMatrix = arr;
    }

    // method returns specific vector of given feature from the matrix
    getFeatureVector(x) {
        var line = [];
        for (var i = 0; i < this.csvMatrix.length; i++) {
            line.push(this.csvMatrix[i][x]);
        }
        return line;
    }

    getFeatures() {
        return this.features;
    }

    // method get a feature string and returns its index
    getFeatureNum(featureName) {
        for (var i = 0; i < this.features.length; i++) {
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

class TimeSeriesAnomalyDetector {
    constructor() { }
    // todo learn normal

}

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
        var linearRegression = linear_reg(points, size);
        var finalDev = 0;
        var tempDev;
        for (var i = 0; i < size; i++) {
            var p = new Point(points[i].x, points[i].y);
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
        var numOfFeatures = timeSeries.getFeatures().length;
        var numOfLines = timeSeries.getFeatureVector(0).length;
        for (var i = 0; i < numOfFeatures; i++) {
            var currentCF = new correlatedFeatures();
            currentCF.corrlation = 0;
            var featureVector1 = timeSeries.getFeatureVector(i);
            for (var j = i + 1; j < numOfFeatures; j++) {
                var featureVector2 = timeSeries.getFeatureVector(j);
                var currentPearson = pearson(featureVector1, featureVector2, numOfLines);
                if ((currentCF.corrlation < currentPearson) && (this.correlationForDetect <= currentPearson)) { // todo here the difference between hybrid and regression
                    var points = [];
                    for (var x = 0; x < numOfLines; x++) {
                        points.push(new Point(timeSeries.getFeatureVector(i)[x], timeSeries.getFeatureVector(j)[x]));
                    }
                    if (0.9 <= currentPearson) {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.line_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = true;
                        var xx = this.findThreshold(numOfLines, points);
                        currentCF.threshold = xx;
                    } else {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.lin_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = false;
                        var c = findMinCircle(points, numOfLines);
                        currentCF.minimumCircle = c;
                        currentCF.threshold = currentCF.minimumCircle.radius * 1.1;
                    }
                }
            }
            if (this.correlationForDetect <= currentCF.corrlation) { this.cf.push(currentCF); }
        }
        var ff = 5;
    }

    detect(timeSeries) {
        var reports = [];
        for (var i = 0; i < this.cf.length; i++) {
            var numOfFeature1 = timeSeries.getFeatureNum(this.cf[i].feature1);
            var numOfFeature2 = timeSeries.getFeatureNum(this.cf[i].feature2);
            var featureVector1 = timeSeries.getFeatureVector(numOfFeature1);
            var featureVector2 = timeSeries.getFeatureVector(numOfFeature2);
            if (this.cf[i].isStrongCorrelation) {
                for (var j = 0; j < featureVector1.length; j++) {
                    var p = new Point(featureVector1[j], featureVector2[j]);
                    var deviation = dev(p, this.cf[i].line_reg);
                    if (this.cf[i].threshold < deviation) {
                        description = this.cf[i].feature1 + "-" + cf[i].feature2;
                        reports.push_back(new AnomalyReport(description, j + 1));
                    }
                }
            } else {
                for (var j = 0; j < featureVector1.length; j++) {
                    var p = new Point(featureVector1[j], featureVector2[j]);
                    var centerOfCircle = this.cf[i].minimumCircle.center;
                    var deviation = this.getDistance(p, centerOfCircle);
                    if (this.cf[i].threshold < deviation) {
                        var description = this.cf[i].feature1 + "-" + this.cf[i].feature2;
                        //AnomalyReport report(description, j + 1);
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


/*console.log("hello");
var arr = [[30, 16, 2],[31, 15, 3], [32, 15, 4], [33, 15, 5], [34, 15, 6], [35, 15, 7], [36, 15, 8], [37, 15, 9], [38, 15, 10]];
var ts = new TimeSeries(arr);
var detctor = new SimpleAnomalyDetector();
detctor.learnNormal(ts, "hybrid");
detctor.detect(ts);

console.log("hello");
*/

function learnAlgo(LearnArr, DetectArr, model_type) {
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

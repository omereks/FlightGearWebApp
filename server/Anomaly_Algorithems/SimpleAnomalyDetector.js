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


    learnNormalHybrid(timeSeries, hybridOrReg) {
        if (hybridOrReg == "hybrid") {
            this.correlationForDetect = 0.5;
        } else {
            this.correlationForDetect = 0.9;
        }
        var numOfFeatures = timeSeries.getFeatures().length;
        var numOfLines = timeSeries.getFeatureVector(0).lentgh;
        for (var i = 0; i < numOfFeatures; i++) {
            var currentCF = new correlatedFeatures();
            currentCF.corlation = 0;
            var featureVector1 = timeSeries.getFeatureVector(i);
            for (var j = i + 1; j < numOfFeatures; j++) {
                var featureVector2 = timeSeries.getFeatureVector(j);
                var currentPearson = pearson(featureVector1[0], featureVector2[0]);
                if ((currentCF.corrlation < currentPearson) && (this.correlationForDetect <= currentPearson)) { // todo here the difference between hybrid and regression
                    var points = [];
                    for (var x = 0; x < numOfLines; x++) {
                        points.push(new Point(timeSeries.getFeatureVector(i)[x], timeSeries.getFeatureVector(j)[x]));
                    }
                    if ( 0.9 <= currentPearson) { // todo implementation of hybrid or regression 
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.lin_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = true;
                        currentCF.threshold = findThreshold(numOfLines, points);
                    } else {
                        currentCF.feature1 = timeSeries.getFeatures()[i];
                        currentCF.feature2 = timeSeries.getFeatures()[j];
                        currentCF.corrlation = currentPearson;
                        currentCF.lin_reg = linear_reg(points, numOfLines);
                        currentCF.isStrongCorrelation = false;
                        var c = m.findMinCircle(points, numOfLines); // todo instead of m should be the class name of this function
                        currentCF.minimumCircle = c;
                        currentCF.threshold = currentCF.minimumCircle.radius * 1.1;
                    }
                }
            }
            if (this.correlationForDetect <= currentCF.corrlation) { this.cf.push(currentCF); }
        }
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
                    var deviation = dev(p, cf[i].lin_reg); // todo dev function from anomaly detectiopj util
                    if (this.cf[i].threshold < deviation) {
                        description = this.cf[i].feature1 + "-" + cf[i].feature2;
                        //AnomalyReport report(description, j + 1);
                        reports.push_back(new AnomalyReport(description, j + 1));
                    }
                }
            } else {
                for (var j = 0; j < featureVector1.length; j++) {
                    var p = new Point(featureVector1[j], featureVector2[j]);
                    var centerOfCircle = this.cf[i].minimumCircle.center;
                    var deviation = getDistance(p, centerOfCircle);
                    if (this.cf[i].threshold < deviation) {
                        var description = this.cf[i].feature1 + "-" + this.cf[i].feature2;
                        //AnomalyReport report(description, j + 1);
                        reports.push_back(new AnomalyReport(description, j + 1));
                    }
                }
            }
        }
        return reports;
    }

    findThreshold(size, points) {
        var linearRegression = linear_reg(points, size); // todo anomaly detection util
        var finalDev = 0;
        var tempDev;
        for (var i = 0; i < size; i++) {
            var p = new Point((points[i].x, points[i].y));
            tempDev =  dev(p, linearRegression); // todo anomaly detection util
            finalDev = Math.max(tempDev, finalDev);
        }
        return finalDev *= 1.1;
    }

    isCorrelated(correlation) {
        return correlationForDetect <= correlation;
    }

    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    getNormalModel() {
        return this.cf;
    }
}

class TimeSeries {
    constructor(features, csvMatrix) {
        this.features = features;
        this.csvMatrix = csvMatrix;
    }
    initFromCsv() {
        // todo


    }
    // method returns specific line from csv matrix
    getFeaturesVector(x) {
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
        for (var i = 0; i < features.length; i++) {
            if (features[i] == featureName) {
                return i;
            }
        }
    }
}
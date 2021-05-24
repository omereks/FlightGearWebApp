// avi
class TimeSeries {
    constructor(csvMatrix) {
        // flight features according to XML file
        this.features = [
            "aileron", "elevator", "rudder", "flaps", "slats", "speedbrake", "throttle", "throttle", "engine-pump", "engine-pump",
            "electric-pump", "electric-pump", "external-power", "APU-generator", "latitude-deg", "longitude-deg", "altitude-ft", "roll-deg", "pitch-deg",
            "heading-deg", "side-slip-deg", "airspeed-kt", "glideslope", "vertical-speed-fps", "airspeed-indicator_indicated-speed-kt", "altimeter_indicated-altitude-ft",
            "altimeter_pressure-alt-ft", "attitude-indicator_indicated-pitch-deg", "attitude-indicator_indicated-roll-deg", "attitude-indicator_internal-pitch-deg",
            "attitude-indicator_internal-roll-deg", "encoder_indicated-altitude-ft", "encoder_pressure-alt-ft", "gps_indicated-altitude-ft", "gps_indicated-ground-speed-kt",
            "gps_indicated-vertical-speed", "indicated-heading-deg", "magnetic-compass_indicated-heading-deg", "slip-skid-ball_indicated-slip-skid",
            "turn-indicator_indicated-turn-rate", "vertical-speed-indicator_indicated-speed-fpm", "engine_rpm"];
        this.csvMatrix = csvMatrix;
    }

    // method returns specific vector of given feature from csv matrix
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
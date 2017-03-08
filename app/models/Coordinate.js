"use strict";
var Coordinate = (function () {
    function Coordinate(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    Coordinate.fromObject = function (path) {
        var result = [];
        for (var i = 0; i < path.length; i++) {
            result.push(new Coordinate(path[i].latitude, path[i].longitude));
        }
        return result;
    };
    Coordinate.prototype.destinationPoint = function (bearing, distance) {
        var earthMeanRadius = 6371;
        distance = distance / earthMeanRadius;
        bearing = this.deg2rad(bearing);
        var lat1 = this.deg2rad(this.latitude);
        var lon1 = this.deg2rad(this.longitude);
        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance) +
            Math.cos(lat1) * Math.sin(distance) * Math.cos(bearing));
        var lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distance) *
            Math.cos(lat1), Math.cos(distance) - Math.sin(lat1) *
            Math.sin(lat2));
        if (isNaN(lat2) || isNaN(lon2))
            return null;
        return new Coordinate(this.rad2deg(lat2), this.rad2deg(lon2));
    };
    Coordinate.prototype.angleFromCoordinate = function (c2) {
        var dLon = (c2.longitude - this.longitude);
        var y = Math.sin(dLon) * Math.cos(c2.latitude);
        var x = Math.cos(this.latitude) * Math.sin(c2.latitude)
            - Math.sin(this.latitude) * Math.cos(c2.latitude) * Math.cos(dLon);
        var bearing = Math.atan2(y, x);
        bearing = this.rad2deg(bearing);
        bearing = (bearing + 360) % 360;
        bearing = 360 - bearing; // count degrees counter-clockwise - remove to make clockwise
        return bearing;
    };
    Coordinate.prototype.getDistanceInKmFrom = function (c2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(c2.latitude - this.latitude); // deg2rad below
        var dLon = this.deg2rad(c2.longitude - this.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(this.latitude)) * Math.cos(this.deg2rad(c2.latitude)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    };
    Coordinate.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    Coordinate.prototype.rad2deg = function (rad) {
        return rad * 180 / Math.PI;
    };
    Coordinate.prototype.toStringProg = function () {
        return "new Coordinate(" + this.latitude + ", " + this.longitude + "),";
    };
    return Coordinate;
}());
exports.Coordinate = Coordinate;
//# sourceMappingURL=coordinate.js.map
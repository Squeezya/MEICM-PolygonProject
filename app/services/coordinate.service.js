"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var mock_paths_1 = require('./../mocks/mock-paths');
var CoordinateService = (function () {
    function CoordinateService() {
    }
    CoordinateService.prototype.getPath = function (i) {
        return Promise.resolve(mock_paths_1.PATHS[i]);
    };
    CoordinateService.prototype.getPathSlowly = function (i) {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 500);
        }) // delay 2 seconds
            .then(function () { return _this.getPath(i); });
    };
    CoordinateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CoordinateService);
    return CoordinateService;
}());
exports.CoordinateService = CoordinateService;
//# sourceMappingURL=coordinate.service.js.map
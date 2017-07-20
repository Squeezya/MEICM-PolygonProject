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
var core_1 = require("@angular/core");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var Operation_1 = require("../../models/Operation");
var ViewOperationModalComponent = (function () {
    function ViewOperationModalComponent() {
    }
    ViewOperationModalComponent.prototype.ngOnInit = function () {
        this.modalConfig = {
            backdrop: 'static'
        };
        this.operation = new Operation_1.Operation();
    };
    ViewOperationModalComponent.prototype.showModal = function (operation) {
        this.operation = Object.assign({}, operation);
        this.modal.show();
    };
    ViewOperationModalComponent.prototype.hideModal = function () {
        this.modal.hide();
    };
    return ViewOperationModalComponent;
}());
__decorate([
    core_1.ViewChild('viewOperationModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], ViewOperationModalComponent.prototype, "modal", void 0);
ViewOperationModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'view-operation-modal',
        templateUrl: 'viewOperationModal.component.html',
        styleUrls: ['viewOperationModal.component.css']
    }),
    __metadata("design:paramtypes", [])
], ViewOperationModalComponent);
exports.ViewOperationModalComponent = ViewOperationModalComponent;
//# sourceMappingURL=viewOperationModal.component.js.map
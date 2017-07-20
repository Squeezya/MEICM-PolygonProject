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
var ConfirmModalComponent = (function () {
    function ConfirmModalComponent() {
        this.onModalSuccess = new core_1.EventEmitter();
        this.onModalCanceled = new core_1.EventEmitter();
    }
    ConfirmModalComponent.prototype.ngOnInit = function () {
        this.modalConfig = {
            backdrop: 'static'
        };
    };
    ConfirmModalComponent.prototype.showModal = function (title, cancelButtonTitle, confirmButtonTitle, auxObject) {
        this.auxObject = auxObject;
        this.title = title;
        this.confirmButtonTitle = confirmButtonTitle;
        this.cancelButtonTitle = cancelButtonTitle;
        this.modal.show();
    };
    ConfirmModalComponent.prototype.hideModal = function () {
        this.modal.hide();
    };
    ConfirmModalComponent.prototype.cancel = function () {
        this.onModalCanceled.emit();
        this.hideModal();
    };
    ConfirmModalComponent.prototype.confirm = function () {
        this.onModalSuccess.emit(this.auxObject);
        this.hideModal();
    };
    return ConfirmModalComponent;
}());
__decorate([
    core_1.ViewChild('confirmModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], ConfirmModalComponent.prototype, "modal", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ConfirmModalComponent.prototype, "onModalSuccess", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ConfirmModalComponent.prototype, "onModalCanceled", void 0);
ConfirmModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'confirm-modal',
        templateUrl: 'confirmModal.component.html',
        styleUrls: ['confirmModal.component.css']
    }),
    __metadata("design:paramtypes", [])
], ConfirmModalComponent);
exports.ConfirmModalComponent = ConfirmModalComponent;
//# sourceMappingURL=confirmModal.component.js.map
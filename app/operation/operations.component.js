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
var operation_service_1 = require("../services/operation.service");
var RestObject_1 = require("../models/RestObject");
var http_1 = require("@angular/http");
var app_service_1 = require("../config/app.service");
var addEditOperationModal_component_1 = require("./addEditOperationModal/addEditOperationModal.component");
var angular2_toaster_1 = require("angular2-toaster");
var viewOperationModal_component_1 = require("./viewOperationModal/viewOperationModal.component");
var confirmModal_component_1 = require("../confirmModal/confirmModal.component");
var OperationsComponent = (function () {
    function OperationsComponent(operationService, toasterService) {
        this.operationService = operationService;
        this.toasterService = toasterService;
    }
    OperationsComponent.prototype.ngOnInit = function () {
        this.perPageOptions = app_service_1.AppSettings.PAGINATION.PER_PAGE_OPTIONS;
        this.currentPage = 1;
        this.perPage = 10;
        this.restOperations = new RestObject_1.RestObject();
        this.getAllOperations(this.currentPage, this.perPage);
    };
    OperationsComponent.prototype.operationsChanged = function (page, perPage) {
        this.currentPage = page;
        this.perPage = perPage;
        this.getAllOperations(this.currentPage, this.perPage);
    };
    OperationsComponent.prototype.successAddEditOperationModal = function (operation) {
        if (operation.id != null) {
            //update
            this.updateOperation(operation);
        }
        else {
            //create
            this.createOperation(operation);
        }
    };
    OperationsComponent.prototype.showConfirmDeleteOperationModal = function (operation) {
        this.confirmDeleteOperationModal.showModal('Delete Operation', 'Close', 'Confirm', operation);
    };
    OperationsComponent.prototype.onConfirmDeleteOperation = function (operation) {
        console.log(operation);
    };
    OperationsComponent.prototype.getAllOperations = function (page, perPage) {
        var _this = this;
        var search = new http_1.URLSearchParams();
        search.append('perPage', perPage.toString());
        search.append('page', page.toString());
        if (this.operationsSubscription && !this.operationsSubscription.closed) {
            this.operationsSubscription.unsubscribe();
        }
        this.operationsSubscription = this.operationService.getWithSearch(search).subscribe(function (res) { return _this.restOperations = res; }, function (error) { return _this.errorMessage = error; });
    };
    OperationsComponent.prototype.createOperation = function (operation) {
        var _this = this;
        this.isModalLoading = this.operationService.create(operation).subscribe(function (res) {
            _this.getAllOperations(_this.currentPage, _this.perPage);
            _this.toasterService.pop('success', 'Add Success', 'Operation "' + res.name + '" added successfully.');
            _this.addEditOperationModal.hideModal();
        }, function (error) {
        });
    };
    OperationsComponent.prototype.updateOperation = function (operation) {
        var _this = this;
        this.isModalLoading = this.operationService.update(operation).subscribe(function (res) {
            _this.getAllOperations(_this.currentPage, _this.perPage);
            _this.toasterService.pop('success', 'Edit Success', 'Operation "' + res.name + '" edited successfully.');
            _this.addEditOperationModal.hideModal();
        }, function (error) {
        });
    };
    return OperationsComponent;
}());
__decorate([
    core_1.ViewChild('viewOperationModal'),
    __metadata("design:type", viewOperationModal_component_1.ViewOperationModalComponent)
], OperationsComponent.prototype, "viewOperationModal", void 0);
__decorate([
    core_1.ViewChild('confirmDeleteOperationModal'),
    __metadata("design:type", confirmModal_component_1.ConfirmModalComponent)
], OperationsComponent.prototype, "confirmDeleteOperationModal", void 0);
__decorate([
    core_1.ViewChild('addEditOperationModal'),
    __metadata("design:type", addEditOperationModal_component_1.AddEditOperationModalComponent)
], OperationsComponent.prototype, "addEditOperationModal", void 0);
OperationsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'operations',
        templateUrl: 'operations.component.html',
        styleUrls: ['operations.component.css']
    }),
    __metadata("design:paramtypes", [operation_service_1.OperationService,
        angular2_toaster_1.ToasterService])
], OperationsComponent);
exports.OperationsComponent = OperationsComponent;
//# sourceMappingURL=operations.component.js.map
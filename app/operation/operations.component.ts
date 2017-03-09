import {Component, OnInit, ViewChild} from '@angular/core';
import {OperationService} from "../services/operation.service";
import {Operation} from "../models/operation";
import {RestObject} from "../models/RestObject";
import {URLSearchParams} from "@angular/http";
import {AppSettings} from "../config/app.service";
import {Subscription, Observable} from "rxjs";
import {AddOperationModalComponent} from "./addEditOperationModal/addEditOperationModal.component";

import {ToasterService} from 'angular2-toaster';

@Component({
    moduleId: module.id,
    selector: 'operations',
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.css']
})

export class OperationsComponent implements OnInit {

    @ViewChild('addEditOperationModal') public addEditOperationModal: AddOperationModalComponent;

    public isModalLoading: Subscription;

    public success() {
        this.isModalLoading = this.operationService.create(this.restOperations.items[0]).subscribe(
            res => {
                this.getAllOperations(this.currentPage, this.perPage);
                this.toasterService.pop('success', 'Add Success', 'Operation "' + res.name + '" added successfully.');
                this.addEditOperationModal.hideModal();
            },
            error => {
            });
    }

    public cancel() {
        console.log('cancel');
    }

    public restOperations: RestObject<Operation>;

    public perPageOptions: number[];
    public currentPage: number;
    public perPage: number;

    public operationsSubscription: Subscription;

    public errorMessage: string;

    constructor(private operationService: OperationService,
                private toasterService: ToasterService) {
    }

    ngOnInit(): void {
        this.perPageOptions = AppSettings.PAGINATION.PER_PAGE_OPTIONS;
        this.currentPage = 1;
        this.perPage = 10;
        this.restOperations = new RestObject<Operation>();
        this.getAllOperations(this.currentPage, this.perPage);
    }

    private getAllOperations(page: number, perPage: number) {
        let search = new URLSearchParams();
        search.append('perPage', perPage.toString());
        search.append('page', page.toString());
        if (this.operationsSubscription && !this.operationsSubscription.closed) {
            this.operationsSubscription.unsubscribe();
        }
        this.operationsSubscription = this.operationService.getWithSearch(search).subscribe(
            res => this.restOperations = res,
            error => this.errorMessage = <any>error);
    }

    public operationsChanged(page: number, perPage: number) {
        this.currentPage = page;
        this.perPage = perPage;
        this.getAllOperations(this.currentPage, this.perPage);
    }
}


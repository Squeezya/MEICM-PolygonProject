import {Component, OnInit} from '@angular/core';
import {OperationService} from "../services/operation.service";
import {Operation} from "../models/operation";
import {RestObject} from "../models/RestObject";
import {URLSearchParams} from "@angular/http";
import {AppSettings} from "../config/app.service";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'operations',
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.css']
})

export class OperationsComponent implements OnInit {

    public restOperations: RestObject<Operation>;

    public perPageOptions: number[];
    public currentPage: number;
    public perPage: number;

    public operationsSubscription: Subscription;

    public errorMessage: string;

    constructor(private operationService: OperationService) {
        this.perPageOptions = AppSettings.PAGINATION.PER_PAGE_OPTIONS;
        this.currentPage = 1;
        this.perPage = 10;
    }

    ngOnInit(): void {
        this.currentPage = 1;
        this.restOperations = new RestObject<Operation>();
        this.getAllOperations(this.currentPage, this.perPage);
    }

    private getAllOperations(page: number, perPage: number) {
        let search = new URLSearchParams();
        search.append('perPage', perPage.toString());
        search.append('page', page.toString());
        if(this.operationsSubscription && !this.operationsSubscription.closed) {
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


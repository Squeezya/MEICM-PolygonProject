import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {Operation} from "../../models/Operation";
import {OperationService} from "../../services/operation.service";

@Component({
    moduleId: module.id,
    selector: 'view-operation-modal',
    templateUrl: 'viewOperationModal.component.html',
    styleUrls: ['viewOperationModal.component.css']
})
export class ViewOperationModalComponent implements OnInit {
    @ViewChild('viewOperationModal') public modal: ModalDirective;

    operation: Operation;

    constructor() {
    }

    public modalConfig: {
        backdrop: string
    };

    ngOnInit(): void {
        this.modalConfig = {
            backdrop: 'static'
        };
        this.operation = new Operation();
    }

    public showModal(operation: Operation): void {
        this.operation = Object.assign({}, operation);
        this.modal.show();
    }

    public hideModal(): void {
        this.modal.hide();
    }

}
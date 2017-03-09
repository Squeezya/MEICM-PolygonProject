import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {Operation} from "../../models/Operation";
import {OperationService} from "../../services/operation.service";

@Component({
    moduleId: module.id,
    selector: 'add-edit-operation-modal',
    templateUrl: 'addEditOperationModal.component.html',
    styleUrls: ['addEditOperationModal.component.css']
})
export class AddOperationModalComponent implements OnInit {
    @ViewChild('addEditOperationModal') public modal: ModalDirective;

    @Output() onModalSuccess = new EventEmitter();
    @Output() onModalCanceled = new EventEmitter();
    @Input() isLoading: Promise<any>;

    isEditing: boolean;
    title: string;
    saveButtonTitle: string;

    constructor(private operationService: OperationService) {
    }

    public modalConfig: {
        backdrop: string
    };

    ngOnInit(): void {
        this.modalConfig = {
            backdrop: 'static'
        };
    }

    public showChildModal(operation: Operation): void {
        this.isEditing = operation != null;
        this.title = this.isEditing ? 'Edit Operation' : 'Add Operation';
        this.saveButtonTitle = this.isEditing ? 'Save' : 'Add';
        this.modal.show();
    }

    public hideModal(): void {
        this.modal.hide();
    }

    public cancel(): void {
        this.onModalCanceled.emit();
        this.hideModal();
    }

    public saveAndClose(): void {
        this.onModalSuccess.emit();
    }

}
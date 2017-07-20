import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'confirm-modal',
    templateUrl: 'confirmModal.component.html',
    styleUrls: ['confirmModal.component.css']
})
export class ConfirmModalComponent implements OnInit {
    @ViewChild('confirmModal') public modal: ModalDirective;

    @Output() onModalSuccess = new EventEmitter();
    @Output() onModalCanceled = new EventEmitter();

    title: string;
    cancelButtonTitle: string;
    confirmButtonTitle: string;
    auxObject: any;

    constructor() {
    }

    public modalConfig: {
        backdrop: string
    };

    ngOnInit(): void {
        this.modalConfig = {
            backdrop: 'static'
        };
    }

    public showModal(title: string,
                     cancelButtonTitle: string,
                     confirmButtonTitle: string,
                     auxObject: any): void {
        this.auxObject = auxObject;
        this.title = title;
        this.confirmButtonTitle = confirmButtonTitle;
        this.cancelButtonTitle = cancelButtonTitle;
        this.modal.show();
    }

    private hideModal(): void {
        this.modal.hide();
    }

    public cancel(): void {
        this.onModalCanceled.emit();
        this.hideModal();
    }

    public confirm(): void {
        this.onModalSuccess.emit(this.auxObject);
        this.hideModal();
    }

}
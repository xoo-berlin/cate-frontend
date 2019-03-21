import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng/api';
import {Document} from '../../model/document/response/Document';
import {DocumentService} from '../../service/document/DocumentService';

@Component({
    template: `

        <div class="ui-g-12">
            <div class="ui-g-3"></div>
            <div class="ui-g-3"></div>
            <div class="ui-g-3"></div>
            <div class="ui-g-3"></div>

            <div class="ui-g-12">
                <p-button label="Speichern" (onClick)="handleSaveClick($event)"></p-button>
                <p-button label="Abbrechen" (onClick)="handleCancelClick($event)"></p-button>
            </div>

        </div>

    `
})

export class DocumentDialog implements OnInit {

    document: Document;
    displayResult: boolean;

    constructor(private documentService: DocumentService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig,
                private messageService: MessageService) {
    }

    ngOnInit() {
        const id: string = this.config.data.documentId;

        this.documentService.id(id)
            .then(document => this.document = document)
            .catch(reason => {
                this.messageService.add(
                    {
                        severity: 'warn',
                        summary: `Fehler beim Laden des Dokumentes: ${id}`,
                        detail: reason
                    }
                );
            });
        this.displayResult = false;
    }

    handleSaveClick(event) {
        this.documentService.save(this.document)
            .then(result => {
                return this.ref.close(result);
            })
            .catch(reason => {
                this.messageService.add(
                    {
                        severity: 'warn',
                        summary: 'Fehler beim Speichern',
                        detail: reason
                    }
                );
            });
    }

    handleCancelClick(event) {
        this.ref.close(document);
    }

}

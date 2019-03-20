import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {History} from '../../model/domain/history/History';
import {HistoryService} from '../../service/history/HistoryService';
import {HistoryItem} from '../../model/domain/history/HistoryItem';

@Component({
    template: `
        <button type="button" (click)="search()" pButton icon="pi pi-info-circle" label="Suchen"></button>

        <p-table [value]="history.items" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="id">ID
                        <p-sortIcon field="id"></p-sortIcon>
                    </th>
                    <th pSortableColumn="clazz">Klasse
                        <p-sortIcon field="clazz"></p-sortIcon>
                    </th>
                    <th pSortableColumn="attribute">Attribut
                        <p-sortIcon field="attribute"></p-sortIcon>
                    </th>
                    <th pSortableColumn="valueOld">alt
                        <p-sortIcon field="valueOld"></p-sortIcon>
                    </th>
                    <th pSortableColumn="valueNew">neu
                        <p-sortIcon field="valueNew"></p-sortIcon>
                    </th>
                    <th pSortableColumn="updatedOn">wann
                        <p-sortIcon field="updatedOn"></p-sortIcon>
                    </th>
                    <th pSortableColumn="updatedBy">wer
                        <p-sortIcon field="updatedBy"></p-sortIcon>
                    </th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-historyitem>
                <tr>
                    <td><span class="ui-column-title">ID</span>{{historyitem.id}}</td>
                    <td><span class="ui-column-title">Klasse</span>{{historyitem.domainClass}}</td>
                    <td><span class="ui-column-title">Attribut</span>{{historyitem.attribute}}</td>
                    <td><span class="ui-column-title">Alt</span>{{historyitem.valueOld}}</td>
                    <td><span class="ui-column-title">Neu</span>{{historyitem.valueNew}}</td>
                    <td><span class="ui-column-title">Wann</span>{{historyitem.updatedOn}}</td>
                    <td><span class="ui-column-title">Wer</span>{{historyitem.updatedBy}}</td>
                    <td>
                        <button pButton icon="pi pi-search" (click)="selectHistoryItem(historyitem)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})

export class HistorySearchDialogComponent implements OnInit {

    entityClazz: string;
    entityId: number;

    history: History = {items: []};
    state: boolean;

    constructor(private historyService: HistoryService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig) {

        this.entityClazz = config.data.entityClazz;
        this.entityId = config.data.entityId;
    }

    ngOnInit() {
        this.historyService.all(this.entityClazz, this.entityId).then(items => this.history = items);
        this.state = false;
    }

    selectHistoryItem(historyItem: HistoryItem) {
        this.ref.close(historyItem);
    }

    search() {
        this.state = !this.state;
        if (this.state) {
            this.history = {};
        } else {
            this.historyService
                .all(this.entityClazz, this.entityId)
                .then(items => this.history = items);
        }
    }

}

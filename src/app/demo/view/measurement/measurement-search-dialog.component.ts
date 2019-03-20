import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {MeasurementSearchItem} from '../../model/domain/measurement/MeasurementSearchItem';
import {MeasurementService} from '../../service/measurement/MeasurementService';
import {MeasurementSearchResult} from '../../model/domain/measurement/MeasurementSearchResult';

@Component({
    template: `
        <div class="ui-fluid">
            <div class="ui-g">
                <div class="ui-g-12">
                    <div class="card card-w-title">
                        <h1>Suche nach Aufmaßen</h1>

                        <div class="ui-inputgroup">
                            <button pButton type="button" label="Search" (click)="search()"
                                    icon="pi pi-info-circle"></button>
                            <input type="text" pInputText placeholder="Keyword" style="border-left:0">
                        </div>
                    </div>

                    <div class="card card-w-title">
                        <h1>Ergebnis</h1>

                        <p-table [columns]="cols"
                                 [value]="measurementSearchResult.items"
                                 selectionMode="single"
                                 dataKey="measurementId"
                                 [style]="{'margin-bottom':'20px'}"
                                 [(selection)]="selectedMeasurement">
                            <ng-template pTemplate="caption">
                                DataTable
                            </ng-template>
                            <ng-template pTemplate="header" let-columns>
                                <tr>
                                    <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                                        {{col.header}}
                                        <p-sortIcon [field]="col.field"></p-sortIcon>
                                    </th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-rowData let-columns="columns">
                                <tr [pSelectableRow]="rowData" (click)="selectMeasurement(rowData)">
                                    <td *ngFor="let col of columns">
                                        {{rowData[col.field]}}
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                </div>

            </div>
        </div>
    `
})

export class MeasurementSearchDialogComponent implements OnInit {

    selectedMeasurement: MeasurementSearchItem;
    measurementSearchResult: MeasurementSearchResult;
    state: boolean;

    cols: any[];

    constructor(private measurementService: MeasurementService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig) {
    }

    ngOnInit() {
        this.measurementService.search().then(items => this.measurementSearchResult = items);
        this.state = false;


        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'measurementNumber', header: 'Aufmaß Nummer'},
            {field: 'offerNumber', header: 'Bestell Nummer'},
            {field: 'deliveryNoteNumber', header: 'Lieferschein Nummer'},
            {field: 'squadNumber', header: 'Trupp Nummer'},
            {field: 'userFullName', header: 'Bearbeiter'},
            {field: 'constructionPeriod', header: 'Bau-Zeitraum'},
            {field: 'state', header: 'Status'},
            {field: 'callOrderDescription', header: 'Abruf Beschreibung'},
            {field: 'invoiceNumber', header: 'Rechnungs Nummer'}
        ];
    }

    selectMeasurement(measurement: MeasurementSearchItem) {
        this.ref.close(measurement);
    }

    search() {
        this.state = !this.state;
        if (this.state) {
            this.measurementSearchResult = {stateCount: 0, totalElements: 0, items: []};
        } else {
            this.measurementService.search().then(items => this.measurementSearchResult = items);
        }
    }

}

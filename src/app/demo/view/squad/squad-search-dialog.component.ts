import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {Squad} from '../../model/domain/squad/Squad';
import {SquadService} from '../../service/squad/SquadService';

@Component({
    template: `
        <button type="button" (click)="search()" pButton icon="pi pi-info-circle" label="Suchen"></button>

        <p-table [value]="squads" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="id">ID
                        <p-sortIcon field="id"></p-sortIcon>
                    </th>
                    <th pSortableColumn="name">Name
                        <p-sortIcon field="year"></p-sortIcon>
                    </th>
                    <th pSortableColumn="squadNumber">Trupp Nummer
                        <p-sortIcon field="squadNumber"></p-sortIcon>
                    </th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-squad>
                <tr>
                    <td><span class="ui-column-title">ID</span>{{squad.id}}</td>
                    <td><span class="ui-column-title">Name</span>{{squad.name}}</td>
                    <td><span class="ui-column-title">Trupp Nummer</span>{{squad.squadNumber}}</td>
                    <td>
                        <button pButton icon="pi pi-search" (click)="selectSquad(squad)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})

export class SquadSearchDialogComponent implements OnInit {

    squads: Squad[];
    displayResult: boolean;

    constructor(private squadService: SquadService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig) {
    }

    ngOnInit() {
        this.squadService.all().then(items => this.squads = items.items);
        this.displayResult = false;
    }

    selectSquad(squad: Squad) {
        this.ref.close(squad);
    }

    search() {
        this.displayResult = !this.displayResult;
        if (this.displayResult) {
            this.squads = [];
        } else {
            this.squadService.all().then(items => this.squads = items.items);
        }
    }

}

import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {Customer} from '../../model/domain/customer/Customer';
import {CustomerService} from '../../service/customer/CustomerService';

@Component({
    template: `
        <button type="button" (click)="search()" pButton icon="pi pi-info-circle" label="Suchen"></button>

        <p-table [value]="customers" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="id">ID
                        <p-sortIcon field="id"></p-sortIcon>
                    </th>
                    <th pSortableColumn="name">Name
                        <p-sortIcon field="year"></p-sortIcon>
                    </th>
                    <th pSortableColumn="address1">Adresse
                        <p-sortIcon field="address1"></p-sortIcon>
                    </th>
                    <th pSortableColumn="zip">Postleitzahl
                        <p-sortIcon field="zip"></p-sortIcon>
                    </th>
                    <th pSortableColumn="city">Stadt
                        <p-sortIcon field="city"></p-sortIcon>
                    </th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-customer>
                <tr>
                    <td><span class="ui-column-title">ID</span>{{customer.id}}</td>
                    <td><span class="ui-column-title">Name</span>{{customer.name}}</td>
                    <td><span class="ui-column-title">Adresse</span>{{customer.address1}}</td>
                    <td><span class="ui-column-title">Postleitzahl</span>{{customer.zip}}</td>
                    <td><span class="ui-column-title">Stadt</span>{{customer.city}}</td>
                    <td>
                        <button pButton icon="pi pi-search" (click)="selectCustomer(customer)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})

export class CustomerSearchDialogComponent implements OnInit {

    customers: Customer[];
    displayResult: boolean;

    constructor(private customerService: CustomerService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig) {
    }

    ngOnInit() {
        this.customerService.all().then(items => this.customers = items);
        this.displayResult = false;
    }

    selectCustomer(customer: Customer) {
        this.ref.close(customer);
    }

    search() {
        this.displayResult = !this.displayResult;
        if (this.displayResult) {
            this.customers = [];
        } else {
            this.customerService.all().then(items => this.customers = items);
        }
    }

}

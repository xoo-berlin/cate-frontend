import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user/response/User';
import {UserService} from '../../service/user/UserService';

@Component({
    template: `
        <button type="button" (click)="search()" pButton icon="pi pi-info-circle" label="Suchen"></button>

        <p-table [value]="users" [paginator]="true" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="id">ID
                        <p-sortIcon field="id"></p-sortIcon>
                    </th>
                    <th pSortableColumn="name">Name
                        <p-sortIcon field="year"></p-sortIcon>
                    </th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-user>
                <tr>
                    <td><span class="ui-column-title">ID</span>{{user.id}}</td>
                    <td><span class="ui-column-title">Name</span>{{user.name}}</td>
                    <td>
                        <button pButton icon="pi pi-search" (click)="selectUser(user)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})

export class UserSearchDialogComponent implements OnInit {

    users: User[];
    displayResult: boolean;

    constructor(private userService: UserService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig) {
    }

    ngOnInit() {
        this.userService.all().then(items => this.users = items.items);
        this.displayResult = false;
    }

    selectUser(user: User) {
        this.ref.close(user);
    }

    search() {
        this.displayResult = !this.displayResult;
        if (this.displayResult) {
            this.users = [];
        } else {
            this.userService.all().then(items => this.users = items.items);
        }
    }

}

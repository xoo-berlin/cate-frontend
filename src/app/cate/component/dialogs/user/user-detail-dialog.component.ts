import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {SearchItem} from '../../../model/search/response/SearchItem';
import {User} from '../../../model/user/response/User';
import {UserService} from '../../../service/user/UserService';

@Component({
    templateUrl: './user-detail-dialog.component.html',
})

export class UserDetailDialogComponent implements OnInit {

    searchItem: SearchItem;
    user: User;

    constructor(private userService: UserService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig) {
    }

    ngOnInit() {
        this.config.header = 'Mitarbeiterdetails: ';
        this.config.width = '70%';
        this.config.contentStyle = {'min-height': '350px', 'max-height': '350px', 'overflow': 'auto'};

        this.searchItem = this.config.data;
    }

    save() {
        // TODO persist
        this.ref.close(this.user);
    }

    cancel() {
        this.ref.close(this.user);
    }

}

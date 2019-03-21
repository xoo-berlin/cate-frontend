import {Component, OnInit, Input} from '@angular/core';
import {SearchItem} from '../../model/search/response/SearchItem';

@Component({
    selector: 'app-search-item-userids',
    templateUrl: './search-item-userids.html'
})
export class HeroDetailComponent implements OnInit {
    @Input() searchItem: SearchItem;

    constructor() {
    }

    ngOnInit() {
    }

}

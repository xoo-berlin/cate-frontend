import {Component} from '@angular/core';
import {DialogService, MessageService} from 'primeng/api';
import {SearchResult} from '../../model/search/response/SearchResult';

@Component({
    templateUrl: './search.component.html',
    providers: [DialogService, MessageService]
})
export class SearchComponent {

    query?: string;
    searchResult?: SearchResult;

    timer;

    constructor(private messageService: MessageService) {
    }

    onSearchChange(searchValue: string) {
        console.log(searchValue);
    }

    onKeyPress() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(this.search, 500);
    }

    search() {
        console.log('Search is called with: ' + this.query);
    }
}

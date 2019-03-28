import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DialogService, Message, MessageService} from 'primeng/api';
import {SearchResult} from '../../model/search/response/SearchResult';
import {environment} from '../../../../environments/environment';
import {SearchService} from '../../service/search/SearchService';
import {SearchItem} from '../../model/search/response/SearchItem';

@Component({
    templateUrl: './search.component.html',
    providers: [DialogService, MessageService]
})
export class SearchComponent implements OnInit {

    debug?: boolean;
    query?: string;
    searchResult?: SearchResult;

    timer;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private dialogService: DialogService,
                private messageService: MessageService,
                private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            console.log('params');
            console.log(params);

            this.debug = params.has('dbg');
            this.query = params.get('q');
            this.search();
        });
    }

    onKeyPress(event) {
        console.log(typeof event);
        console.log(event);

        this.query = event.target.value;

        // TODO validate Input

        // request delay functionality
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(
            () => {
                this.search();
            },
            environment.requestDelay);

    }

    reset() {
        this.query = '';
        this.searchResult = null;

        this.initURL();
    }

    initURL() {
        this.location.replaceState('/', `q=${this.query}`);
    }

    /**
     * Search Against Backend and populate the Search Result
     * Note: only exec if we dont have a search result OR
     * the search result query is different than the current one
     */
    search() {
        console.log(`Search was called with query _${this.query}_`);

        const resultSetQueryNormalized = this.searchResult && this.searchResult.query ? this.searchResult.query.trim().toLowerCase() : '';
        const queryNormalized = this.query ? this.query.trim().toLowerCase() : '';

        const executeQuery = resultSetQueryNormalized !== queryNormalized && queryNormalized.length > 0;
        console.log('resultQueryNormalized: ' + resultSetQueryNormalized);
        console.log('queryNormalized: ' + queryNormalized);
        console.log('Execute Query: ' + executeQuery);

        if (executeQuery) {
            this.searchService.search(queryNormalized)
                .then(searchResult => {
                        this.searchResult = searchResult;
                    }
                )
                .then(() => {
                    this.initURL();
                })
                .catch(reason => {

                    const message: Message = {
                        key: 'searchMessages',
                        severity: 'warn',
                        summary: 'Fehler beim Suchen',
                        detail: reason
                    };

                    this.messageService.add(
                        message
                    );
                });
            console.log('Search is called with: ' + this.query);
        }
    }

    searchInBusinessUnit(searchItem: SearchItem) {
        console.log(`searchInBusinessUnit was called with Searchitem: ${searchItem}`);

    }

    searchInRoom(searchItem: SearchItem) {
        console.log(`SearchInRoom was called with Searchitem: ${searchItem}`);

    }

    fullname(searchItem: SearchItem): string {

        if (searchItem && (searchItem.title || searchItem.firstName || searchItem.lastName)) {
            return (searchItem.title ? searchItem.title + ' ' : '') +
                (searchItem.lastName ? searchItem.lastName + ', ' : '') +
                (searchItem.firstName ? searchItem.firstName : '');
        } else {
            return '';
        }
    }

    showUserDetail(searchItem: SearchItem) {
        this.router.navigate(['/details/', searchItem.id]);
        // you have to check this out by passing required route value.
        // this line will redirect you to your destination. By reaching to destination you can close your loader service.
        // please note this implementation may vary according to your routing code.

    }

}

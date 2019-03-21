import {Component} from '@angular/core';
import {DialogService, Message, MessageService} from 'primeng/api';
import {SearchResult} from '../../model/search/response/SearchResult';
import {environment} from '../../../../environments/environment';
import {SearchService} from '../../service/search/SearchService';
import {SearchItem} from '../../model/search/response/SearchItem';

@Component({
    templateUrl: './search.component.html',
    providers: [DialogService, MessageService]
})
export class SearchComponent {

    query?: string;
    searchResult?: SearchResult;

    timer;

    constructor(private messageService: MessageService,
                private searchService: SearchService) {
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

    fullname(searchItem: SearchItem): string {

        if (searchItem && (searchItem.title || searchItem.firstName || searchItem.lastName)) {
            return (searchItem.title ? searchItem.title + ' ' : '') +
                (searchItem.lastName ? searchItem.lastName + ', ' : '') +
                (searchItem.firstName ? searchItem.firstName : '');
        } else {
            return '';
        }
    }

    showDocumentDialog(searchItem) {

    }
}

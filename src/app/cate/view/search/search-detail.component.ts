import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DialogService, Message, MessageService} from 'primeng/api';
import {SearchService} from '../../service/search/SearchService';
import {SearchItem} from '../../model/search/response/SearchItem';

@Component({
    templateUrl: './search-detail.component.html',
    providers: [DialogService, MessageService]
})
export class SearchDetailComponent implements OnInit {

    query?: string;
    searchItem?: SearchItem;

    constructor(private route: ActivatedRoute,
                private dialogService: DialogService,
                private messageService: MessageService,
                private searchService: SearchService,
                private location: Location) {
    }

    ngOnInit(): void {

        let id: any;
        let url: any;

        this.route.url.subscribe(segments => url = segments.join(''));
        this.route.params.subscribe(p => id = p.id);

        console.log(`id: ${id}`);
        console.log(`url: ${url}`);

        if (id) {
            console.log('Load Id: ' + id);
            this.searchService.id(id)
                .then(item => this.initDocument(item))
                .catch(reason => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Fehler beim Laden des Dokuments Nr. ' + id,
                        detail: 'Grund: ' + reason
                    });

                    const searchItem: SearchItem = {};
                    this.initDocument(searchItem);
                });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Fehler beim Laden des Dokuments',
                detail: 'Grund: keine ID angegeben'
            });

            const searchItem: SearchItem = {};
            this.initDocument(searchItem);
        }
    }

    initDocument(searchItem: SearchItem) {
        this.searchItem = searchItem;
    }

    backClicked() {
        this.location.back();
    }
}

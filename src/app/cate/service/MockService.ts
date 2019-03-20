import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResult} from '../model/search/response/SearchResult';

@Injectable()
export class MockService {

    constructor(private http: HttpClient) {
    }

    search(input: string): SearchResult {
        return {
            took: 10,
            page: 0,
            size: 100,
            totalElements: 100,
            totalPages: 1,
            items: [
                {id: 'doc:1', name: 'just a name 1'},
                {id: 'doc:2', name: 'just a name 2'},
                {id: 'doc:3', name: 'just a name 3'}
            ]
        };
    }

}

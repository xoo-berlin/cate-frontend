import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResult} from '../model/search/response/SearchResult';

@Injectable()
export class MockService {

    constructor(private http: HttpClient) {
    }

    search(input: string): SearchResult {
        return {
            query: input,
            took: 10,
            page: 0,
            size: 100,
            totalElements: 100,
            totalPages: 1,
            items: [
                {
                    id: 'doc:1',
                    name: 'just a name 1',
                    title: 'Dipl. Inf',
                    firstName: 'Ralf',
                    lastName: 'Heyde',
                    m: new Map([['key 1', 'value 1'], ['key 2', 'value 2']]),
                    userIds: [
                        {key: 'BER', value: 'heyd01'},
                        {key: 'BLN', value: 'heyd051'}
                    ],
                },
                {id: 'doc:2', name: 'just a name 2', m: new Map([['key 1', 'value 1'], ['key 2', 'value 2']]), userIds: []},
                {id: 'doc:3', name: 'just a name 3', m: new Map([['key 1', 'value 1'], ['key 2', 'value 2']]), userIds: []}
            ]
        };
    }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SearchItem} from '../../model/search/response/SearchItem';
import {User} from '../../model/user/response/User';
import {SearchResult} from '../../model/search/response/SearchResult';
import {MockService} from '../MockService';

@Injectable()
export class SearchService {

    constructor(private http: HttpClient,
                private mockService: MockService) {
    }

    search(input: string): Promise<SearchResult> {
        const host = environment.host;
        const searchApi = environment.searchApi;
        const http = `${host}${searchApi}_search/`;

        return Promise.resolve(
            this.mockService.search(input)
        );

        /*
        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <SearchResult>res)
            .then(res => {
                console.log(res);
                return res;
            })
            .then(data => data);
        */
    }

    id(documentId: string): Promise<SearchItem> {
        const host = environment.host;
        const searchApi = environment.searchApi;
        const http = `${host}${searchApi}${documentId}/`;

        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <SearchItem>res)
            .then(res => {
                console.log(res);
                return res;
            });
    }

}

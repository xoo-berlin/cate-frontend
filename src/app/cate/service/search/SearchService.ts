import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../model/user/response/User';
import {Users} from '../../model/user/response/Users';
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

    id(documentId: string) {
        const host = environment.host;
        const searchApi = environment.searchApi;
        const http = `${host}${searchApi}${documentId}/`;

        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <User>res)
            .then(res => {
                console.log(res);
                return res;
            });
    }

}

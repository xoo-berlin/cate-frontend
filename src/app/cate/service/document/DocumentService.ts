import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../model/user/response/User';
import {Users} from '../../model/user/response/Users';

@Injectable()
export class DocumentService {

    constructor(private http: HttpClient) {
    }

    all() {
        const host = environment.host;
        const documentApi = environment.documentApi;
        const http = `${host}${documentApi}`;

        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <Users>res)
            .then(res => {
                console.log(res);
                return res;
            })
            .then(data => data);
    }

    id(documentId: string) {
        const host = environment.host;
        const documentApi = environment.documentApi;
        const http = `${host}${documentApi}${documentId}/`;

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

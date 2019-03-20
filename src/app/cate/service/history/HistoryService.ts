import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {History} from '../../model/history/History';

@Injectable()
export class HistoryService {

    constructor(private http: HttpClient) {
    }

    all(entityClazz: string, entityId: number) {
        const api = environment.host;
        const http = `${api}/api/v1/erp/history/${entityClazz}/${entityId}/`;

        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <History>res)
            .then(res => {
                console.log(res);
                return res;
            })
            .then(data => data);

    }

}

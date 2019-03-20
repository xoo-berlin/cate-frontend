import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {State} from '../../model/domain/common/State';

@Injectable()
export class StateService {

    constructor(private http: HttpClient) {
    }

    all() {
        return this.http.get<any>('assets/mock/common/states.json')
            .toPromise()
            .then(res => <State[]>res.data)
            .then(data => data);
    }
}

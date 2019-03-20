import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Unit} from '../../../demo/model/domain/common/Unit';

@Injectable()
export class UnitService {

    constructor(private http: HttpClient) {
    }

    all() {
        return this.http.get<any>('assets/mock/common/units.json')
            .toPromise()
            .then(res => <Unit[]>res.data)
            .then(data => data);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../../cate/model/user/response/User';
import {Users} from '../../../cate/model/user/response/Users';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    all() {
        const api = environment.api;
        const http = `${api}/api/v1/erp/users/`;

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

    getById(userId: number) {
        const api = environment.api;
        const http = `${api}/api/v1/erp/users/${userId}/`;

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

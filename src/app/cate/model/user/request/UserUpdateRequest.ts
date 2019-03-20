import {UpdateRequest} from '../../common/UpdateRequest';

export interface User extends UpdateRequest {
    id?: number;
    name?: string;
}

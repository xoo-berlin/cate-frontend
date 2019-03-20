import {UpdateRequest} from '../../common/UpdateRequest';

export interface DocumentUpdateRequest extends UpdateRequest {
    id?: string;
    name?: string;
}

import {KeyValue} from '../../common/KeyValue';

export interface SearchItem {
    id?: string;
    name?: string;

    gender?: string;
    title?: string;
    firstName?: string;
    lastName?: string;

    m: Map<string, string>;

    userIds: KeyValue<string, string>[];
}

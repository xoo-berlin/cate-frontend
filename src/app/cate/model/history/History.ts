import {HistoryItem} from './HistoryItem';

export interface History {
    page?: number;
    size?: number;
    totalPages?: number;
    totalElements?: number;

    items?: HistoryItem[];
}

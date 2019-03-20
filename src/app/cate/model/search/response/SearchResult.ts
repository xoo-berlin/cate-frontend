import {Page} from '../../common/Page';
import {SearchItem} from './SearchItem';

export interface SearchResult extends Page<SearchItem> {
    took: number;
}

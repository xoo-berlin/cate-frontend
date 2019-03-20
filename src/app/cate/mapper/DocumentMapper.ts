import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DocumentUpdateRequest} from '../model/document/request/DocumentUpdateRequest';
import {Document} from '../model/document/response/Document';

@Injectable()
export class MeasurementService {

    constructor(private http: HttpClient) {
    }

    mapToRequest(document: Document): DocumentUpdateRequest {
        return {
            id: document.id,
            rowVersion: document.rowVersion,
            name: document.name
        };
    }

}

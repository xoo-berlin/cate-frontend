import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Document} from '../../model/document/response/Document';
import {Documents} from '../../model/document/response/Documents';
import {DocumentMapper} from '../../mapper/DocumentMapper';

@Injectable()
export class DocumentService {

    constructor(private http: HttpClient,
                private documentMapper: DocumentMapper) {
    }

    all() {
        const host = environment.host;
        const documentApi = environment.documentApi;
        const http = `${host}${documentApi}`;

        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <Documents>res)
            .then(res => {
                console.log(res);
                return res;
            })
            .then(data => data);
    }

    id(documentId: string) {
        const host = environment.host;
        const documentApi = environment.documentApi;
        const http = `${host}${documentApi}${documentId}/`;

        return this.http.get<any>(http)
            .toPromise()
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => <Document>res)
            .then(res => {
                console.log(res);
                return res;
            });
    }

    save(document: Document) {

        // if we have an id, post against /id/
        // if not, put against /

        const documentUpdateRequest = this.documentMapper.mapToRequest(document);
        const host = environment.host;
        const documentApi = environment.documentApi;

        if (document.id) {
            const documentId = document.id;
            const http = `${host}${documentApi}${documentId}/`;

            return this.http.post(http, documentUpdateRequest)
                .toPromise()
                .then(res => {
                    console.log(res);
                    return res;
                })
                .then(res => <Document>res)
                .then(res => {
                    console.log(res);
                    return res;
                });
        } else {
            const http = `${host}${documentApi}`;

            return this.http.put(http, documentUpdateRequest)
                .toPromise()
                .then(res => {
                    console.log(res);
                    return res;
                })
                .then(res => <Document>res)
                .then(res => {
                    console.log(res);
                    return res;
                });

        }

    }

}

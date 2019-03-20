import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {MeasurementService} from '../../service/measurement/MeasurementService';
import {MeasurementSearchResult} from '../../model/domain/measurement/MeasurementSearchResult';
import {MeasurementSearchItem} from '../../model/domain/measurement/MeasurementSearchItem';
import {MenuItem, Message, MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
    templateUrl: './search.component.html',
    providers: [MessageService]
})
export class MeasurementSearchComponent implements OnInit {

    measurementSearchResult: MeasurementSearchResult;

    selectedType: string;
    selectedMeasurment: MeasurementSearchItem;

    cols: any[];
    tabMenuItems: MenuItem[];

    errorMessages: Message[] = [];
    error: boolean;

    constructor(private messageService: MessageService,
                private measurementService: MeasurementService,
                private nodeService: NodeService,
                private router: Router) {
    }

    ngOnInit() {
        this.measurementService.search()
            .then(result => {
                this.measurementSearchResult = result;
                this.error = false;
            })
            .catch(reason => {
                this.error = true;

                console.error('Error for measurementService.search()');
                console.error(reason);

                this.errorMessages = [];
                this.errorMessages.push({severity: 'error', summary: 'Error Message', detail: 'Grund: ' + reason});
            });

        this.cols = [
            {field: 'measurementId', header: 'measurementId'},
            {field: 'measurementNumber', header: 'Aufmaß Nummer'},
            {field: 'state', header: 'Status'},
            {field: 'constructionProject', header: 'Bauvorhaben'},
            {field: 'comment', header: 'Kommentar'},
            {field: 'offerNumber', header: 'Bestell Nummer'},
            {field: 'deliveryNoteNumber', header: 'Lieferschein Nummer'},
            {field: 'squadNumber', header: 'Trupp Nummer'},
            {field: 'userFullName', header: 'Bearbeiter'},
            {field: 'constructionPeriod', header: 'Bau-Zeitraum'},
            {field: 'displayResult', header: 'Status'},
            {field: 'invoiceNumber', header: 'Rechnungs Nummer'}
        ];

        this.tabMenuItems = [
            {label: 'Alle (110)'},
            {label: 'in Bearbeitung (30)'},
            {label: 'Bearbeitung abgeschlossen (50)'},
            {label: 'Rechnungslegung (20)'},
            {label: 'Rechnungslegung abgeschlossen (10)'}
        ];
    }

    show(searchItem: MeasurementSearchItem) {
        console.log('MeasurementSearchItem');
        console.log(searchItem);

        this.router.navigate(['/measurements/', searchItem.measurementId]);
        // you have to check this out by passing required route value.
        // this line will redirect you to your destination. By reaching to destination you can close your loader service.
        // please note this implementation may vary according to your routing code.

    }

}

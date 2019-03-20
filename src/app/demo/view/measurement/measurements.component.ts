import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {MeasurementService} from '../../service/measurement/MeasurementService';
import {MeasurementSearchResult} from '../../model/domain/measurement/MeasurementSearchResult';
import {MeasurementSearchItem} from '../../model/domain/measurement/MeasurementSearchItem';
import {Router} from '@angular/router';

@Component({
    templateUrl: './measurements.component.html'
})
export class MeasurementsComponent implements OnInit {

    measurementSearchResult: MeasurementSearchResult = {items: []};

    selectedMeasurement: MeasurementSearchItem;

    cols: any[];

    constructor(private measurementService: MeasurementService,
                private nodeService: NodeService,
                private router: Router) {
    }

    ngOnInit() {
        this.measurementService.search().then(result => this.measurementSearchResult = result);

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'measurementNumber', header: 'Aufmaß Nummer'},
            {field: 'offerNumber', header: 'Bestell Nummer'},
            {field: 'deliveryNoteNumber', header: 'Lieferschein Nummer'},
            {field: 'squadNumber', header: 'Trupp Nummer'},
            {field: 'userFullName', header: 'Bearbeiter'},
            {field: 'constructionPeriod', header: 'Bau-Zeitraum'},
            {field: 'state', header: 'Status'},
            {field: 'callOrderDescription', header: 'Abruf Beschreibung'},
            {field: 'invoiceNumber', header: 'Rechnungs Nummer'}
        ];
    }

    show(measurementSearchItem: MeasurementSearchItem) {
        this.router.navigate(['/measurements/', measurementSearchItem.measurementId]);
        // you have to check this out by passing required route value.
        // this line will redirect you to your destination. By reaching to destination you can close your loader service.
        // please note this implementation may vary according to your routing code.

    }

}

import {Unit} from '../../domain/common/Unit';
import {MeasurementPosition} from '../../domain/measurement/MeasurementPosition';

export class MeasurementPositionModel {
    // state information
    rowNumber: number;
    newIndicator: boolean;
    edited: boolean;
    grouped: boolean;

    // reference
    initialMeasurementPosition?: MeasurementPosition;

    // local data
    id?;
    measurementId?;
    sequenceNumber?;
    positionNumber?;
    multiplier?;
    length?;
    width?;
    height?;
    unit?: Unit;
    serviceDescription?;
    comment?;
    unitSalary?;

    // temporary
    product?;

    constructor(rowNumber: number,
                newIndicator: boolean = false,
                edited: boolean = false,
                grouped: boolean = false) {
        this.rowNumber = rowNumber;
        this.newIndicator = newIndicator;
        this.edited = edited;
        this.grouped = grouped;
    }

}

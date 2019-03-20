import {formatDate} from '@angular/common';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MeasurementSearchResult} from '../../demo/model/domain/measurement/MeasurementSearchResult';
import {Measurement} from '../../demo/model/domain/measurement/Measurement';
import {MeasurementUpdateRequest} from '../../demo/model/domain/measurement/request/MeasurementUpdateRequest';
import {MeasurementPositionCommon} from '../../demo/model/domain/measurement/common/MeasurementPositionCommon';
import {Constants} from '../../../const/Constants';
import {ReleaseOrderCommon} from '../../demo/model/domain/measurement/common/ReleaseOrderCommon';
import {MeasurementResponse} from '../../demo/model/domain/measurement/response/MeasurementResponse';
import {State} from '../../demo/model/domain/common/State';
import {ReleaseOrder} from '../../demo/model/domain/measurement/ReleaseOrder';
import {MeasurementPosition} from '../../demo/model/domain/measurement/MeasurementPosition';

@Injectable()
export class MeasurementService {

    constructor(private http: HttpClient) {
    }

    mapToInternal(measurementResponse: MeasurementResponse): Measurement {
        const measurment: Measurement = {

            id: measurementResponse.id,
            rowVersion: measurementResponse.rowVersion,
            measurementNumber: measurementResponse.measurementNumber,
            mainMeasurementId: measurementResponse.mainMeasurementId,
            mainMeasurementNumber: measurementResponse.mainMeasurementNumber,

            measurementPart: measurementResponse.measurementPart,
            state: measurementResponse.state,

            updatedOn: measurementResponse.updatedOn,
            updatedBy: measurementResponse.updatedBy,

            squadId?: number;
            squadNumber?: number;
            userId?: number;
            userFullName?: string;
            offerId?: number;
            offerNumber?: string;
            invoiceId?: number;
            invoiceNumber?: string;

            releaseOrders?: ReleaseOrder[];

            constructionProject?: string;
            comment?: string;
            personResponsibleAtCustomer?: string;
            customerArea?: string;

            constructionPeriodStart?: Date;
            constructionPeriodEnd?: Date;
            accountingPeriod?: Date;

            positions?: MeasurementPosition[];



    }

    }

    mapToRequest(measurement: Measurement): MeasurementUpdateRequest {
        const updateRequest: MeasurementUpdateRequest = {

            rowVersion: measurement.rowVersion,
            measurementNumber: measurement.measurementNumber,
            mainMeasurementId: measurement.mainMeasurementId,
            mainMeasurementNumber: measurement.mainMeasurementNumber,

            measurementPart: measurement.measurementPart,
            state: measurement.state.name,

            squadId: measurement.squadId,
            userId: measurement.userId,
            offerId: measurement.offerId,
            invoiceId: measurement.invoiceId,

            constructionProject: measurement.constructionProject,
            comment: measurement.comment,
            personResponsibleAtCustomer: measurement.personResponsibleAtCustomer,
            customerArea: measurement.customerArea,

            constructionPeriodStart: formatDate(measurement.constructionPeriodStart, Constants.REQUEST_DATE_FORMAT, 'de'),
            constructionPeriodEnd: formatDate(measurement.constructionPeriodEnd, Constants.REQUEST_DATE_FORMAT, 'de'),
            accountingPeriod: formatDate(measurement.accountingPeriod, Constants.REQUEST_DATE_FORMAT, 'de'),

            positions: this.positionsCommon(measurement),
            releaseOrders: this.releaseOrdersCommon(measurement)
        };

        console.log('MeasurementUpdateRequest');
        console.log(updateRequest);

        return updateRequest;
    }


    private positionsCommon(measurement: Measurement): MeasurementPositionCommon[] {

        if (measurement.positions) {
            return measurement.positions.map(
                position => {
                    return {
                        id: position.id,
                        rowVersion: position.rowVersion,
                        grouped: position.grouped,
                        positionNumber: position.positionNumber,
                        sequenceNumber: position.sequenceNumber,
                        multiplier: position.multiplier,
                        length: position.length,
                        width: position.width,
                        height: position.height,
                        product: position.product,
                        unit: position.unit,
                        serviceDescription: position.serviceDescription,
                        comment: position.comment,
                        unitSalary: position.unitSalary
                    };
                }
            );
        } else {
            return [];
        }
    }

    private releaseOrdersCommon(measurement: Measurement): ReleaseOrderCommon[] {

        if (measurement.releaseOrders) {
            return measurement.releaseOrders.map(
                releaseOrder => {
                    return {
                        id: releaseOrder.id,
                        rowVersion: releaseOrder.rowVersion,
                        measurementType: releaseOrder.measurementType.name,
                        purchaseId: releaseOrder.purchaseId
                    };
                }
            );
        } else {
            return [];
        }
    }
}

import {PipeTransform} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {DateFormatPipe} from '../../../../const/DateFormatPipe';

// Model
import {MeasurementPositionModel} from '../../model/component/measurement/MeasurementPositionModel';
import {f, State} from '../../model/domain/common/State';
import {Unit} from '../../model/domain/common/Unit';
import {CustomerArea} from '../../model/domain/measurement/CustomerArea';
import {Measurement} from '../../model/domain/measurement/Measurement';
import {
    MAIN,
    MeasurementPart,
    NONE,
    PARTIAL
} from '../../model/domain/measurement/MeasurementPart';
import {MeasurementPosition} from '../../model/domain/measurement/MeasurementPosition';
import {MeasurementType} from '../../model/domain/measurement/MeasurementType';
import {ReleaseOrder} from '../../model/domain/measurement/ReleaseOrder';
import {Squad} from '../../model/domain/squad/Squad';
import {User} from '../../../cate/model/user/response/User';

export class MeasurementViewModel {

    static readonly DATE_FORMAT_PIPE = new DateFormatPipe('de');

    measurement: Measurement;

    // selected user
    selectedUser: User = {};

    // selected squad
    selectedSquad: Squad = {};

    // Customer Areas
    customerAreasSelectItems: SelectItem[] = [];

    // Release Orders
    releaseOrdersSelectItems: SelectItem[] = [];

    // measurement parts
    measurementPartSelectItems: SelectItem[] = [];
    selectedMeasurementPart: MeasurementPart = NONE;

    // measurement positions
    measurementPositionModels: MeasurementPositionModel[];
    // measurement  positions Helper
    unitSelectItems: SelectItem[] = [];

    // release order dialog
    measurementTypes: MeasurementType[] = [];

    // suggest data
    usersSuggest: User[];

    // main screen
    statesAll: State[] = [];
    unitsAll: Unit[] = [];

    squadByIdFn: (number) => Promise<Squad>;
    userByIdFn: (number) => Promise<User>;
    allUsersFn: () => Promise<User[]>;
    allMeasurementPartsFn: () => MeasurementPart[];
    measurementPartFromStringFn: (string) => MeasurementPart;

    // Helper
    static calcPosition(measurementPositionModel: MeasurementPositionModel): number {
        if (measurementPositionModel.multiplier &&
            measurementPositionModel.length &&
            measurementPositionModel.width &&
            measurementPositionModel.length) {

            return measurementPositionModel.multiplier *
                measurementPositionModel.length *
                measurementPositionModel.width *
                measurementPositionModel.height;
        }

        return 0;
    }

    public init(measurement: Measurement): Measurement {
        this.measurement = measurement;

        this.initDates();
        this.initMeasurementParts();
        this.initMeasurementPart();
        this.initReleaseOrders();
        this.initSquad();
        this.initUser();
        this.initMeasurementPositionModel();

        //
        this.initMeasurementTypes();

        return this.measurement;
    }

    public initMeasurementParts() {
        this.measurementPartSelectItems =
            this.allMeasurementPartsFn().map(
                item => {
                    return {label: item.name, value: item};
                }
            );
    }

    public initMeasurementTypes() {
        this.measurementTypes = [];
        this.measurementTypes.push({id: 0, name: 'Art auswählen'});
        this.measurementTypes.push({id: 1, name: 'Fernmeldeaufmaß'});
        this.measurementTypes.push({id: 2, name: 'Tiefbauaufmaß'});
        this.measurementTypes.push({id: 3, name: 'HA Anschluss'});
    }

    public initUnits(units: Unit[]): Unit[] {
        this.unitsAll = [];
        for (const unit of units) {
            this.unitsAll.push(unit);
        }

        this.initUnitSelectItems();

        return units;
    }

    public initUnitSelectItems() {
        this.unitSelectItems = [];
        for (const unit of this.unitsAll) {
            this.unitSelectItems.push({label: unit.name, value: unit});
        }
    }

    public initStates(states: State[]): State[] {
        this.statesAll = [];

        for (const state of states) {
            this.statesAll.push(state);
        }

        return states;
    }


    public initMeasurementPart() {
        console.log('initMeasurementPart: value= ' + this.measurement.measurementPart);

        const measurementPart = this.measurementPartFromStringFn(this.measurement.measurementPart);
        this.selectMeasurementPart(
            measurementPart
        );

        console.log('initMeasurementPart: value= ' + measurementPart);
    }

    private selectMeasurementPart(measurementPart: MeasurementPart) {
        this.selectedMeasurementPart = measurementPart;
    }

    public initReleaseOrders() {
        const releaseOrders = this.measurement.releaseOrders;

        console.log('Release Orders');
        console.log(releaseOrders);

        this.releaseOrdersSelectItems = [];

        if (releaseOrders) {
            for (const releaseOrder of releaseOrders) {
                const releaseOrderName = releaseOrder.name ? releaseOrder.name : '';
                const orderNumber = releaseOrder.purchaseNumber ? releaseOrder.purchaseNumber : '';
                const measurementType = releaseOrder.measurementType ? releaseOrder.measurementType.name : '';

                const label = `${releaseOrderName}, Bestell Nummer: ${orderNumber}, Art: ${measurementType}`;
                this.releaseOrdersSelectItems.push({label: label, value: releaseOrder});
            }
        }
    }

    public suggestUsers(filter: any): Promise<User[]> {

        return this.allUsersFn()
            .then(users => {
                    const usersSuggest = users.filter(user => {
                        return user.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
                    });

                    this.usersSuggest = [...usersSuggest];

                    return this.usersSuggest;
                }
            );
    }

    public initUser() {
        const userId = this.measurement.userId;
        this.userByIdFn(userId)
            .then(user => this.selectUser(user));
    }

    public selectUser(user: User): User {
        if (user) {
            this.selectedUser = user;
        } else {
            this.selectedUser = {};
        }
        return user;
    }

    public initSquad() {
        const squadId = this.measurement.squadId;
        this.squadByIdFn(squadId)
            .then(squad => this.selectSquad(squad));
    }

    public selectSquad(squad: Squad): Squad {
        if (squad) {
            this.selectedSquad = squad;
        } else {
            this.selectedSquad = {};
        }
        return squad;
    }

    // helpers
    private asDate(candidate: any): Date {

        const day = Number(candidate.substr(0, 2));
        const month = Number(candidate.substr(3, 2)) - 1;
        const year = Number(candidate.substr(6, 4));

        return new Date(year, month, day);
    }

    private somethingAsDate(candidate: string | Date, datePipe: PipeTransform): Date {
        try {
            if (candidate instanceof Date) {
                return candidate;
            } else {
                return this.asDate(datePipe.transform(candidate));
            }

        } catch (e) {
            console.log(`Error formatting string candidate: ${candidate} using datePipe: ${datePipe}, error: ${e}`);
            console.log(e);
        }
        return null;
    }

    private stringToDate(candidate: string): Date {
        try {
            return new Date(candidate);
        } catch (e) {
            console.log(`Error formatting string candidate: ${candidate} to Date, error: ${e}`);
            console.log(e);
        }
        return null;
    }

    public initDates() {
        this.measurement.constructionPeriodStart =
            this.somethingAsDate(this.measurement.constructionPeriodStart, MeasurementViewModel.DATE_FORMAT_PIPE);
        this.measurement.constructionPeriodEnd =
            this.somethingAsDate(this.measurement.constructionPeriodEnd, MeasurementViewModel.DATE_FORMAT_PIPE);
        this.measurement.accountingPeriod =
            this.somethingAsDate(this.measurement.accountingPeriod, MeasurementViewModel.DATE_FORMAT_PIPE);
    }

    initMeasurementPositionModel() {
        let rowNumber = 0;

        this.measurementPositionModels = [];

        // existing
        if (this.measurement.positions) {
            for (const measurementPosition of this.measurement.positions) {
                const measurementPositionModel: MeasurementPositionModel = {

                    // state information
                    rowNumber: rowNumber++,
                    newIndicator: false,
                    edited: false,
                    grouped: false
                };

                measurementPositionModel.initialMeasurementPosition = measurementPosition;

                // local data
                measurementPositionModel.id = measurementPosition.id;
                measurementPositionModel.measurementId = measurementPosition.measurementId;

                measurementPositionModel.sequenceNumber = measurementPosition.sequenceNumber;
                measurementPositionModel.positionNumber = measurementPosition.positionNumber;
                measurementPositionModel.multiplier = measurementPosition.multiplier;
                measurementPositionModel.length = measurementPosition.length;
                measurementPositionModel.width = measurementPosition.width;
                measurementPositionModel.height = measurementPosition.height;
                measurementPositionModel.product = measurementPosition.product;
                measurementPositionModel.unit = lookup;
                measurementPosition.unit;
                measurementPositionModel.serviceDescription = measurementPosition.serviceDescription;
                measurementPositionModel.comment = measurementPosition.comment;
                measurementPositionModel.unitSalary = measurementPosition.unitSalary;

                this.measurementPositionModels.push(measurementPositionModel);
            }
        }

        // add empty
        for (let i = 0; i < 10; i++) {
            // extend by additional (not existing ones)
            const measurementPositionModelNew: MeasurementPositionModel = {

                // state information
                rowNumber: rowNumber++,
                newIndicator: true,
                edited: false,
                grouped: false
            };

            this.measurementPositionModels.push(measurementPositionModelNew);
        }
    }

    public initializeCustomerAreas(items: CustomerArea[]) {
        this.customerAreasSelectItems = [];

        for (const customerArea of items) {
            this.customerAreasSelectItems.push({label: customerArea.name, value: customerArea});
        }
    }

    prepareUpdate(): Measurement {
        // copy all information into a 'new' Model

        const preparedMeasurement: Measurement = {};

        preparedMeasurement.id = this.measurement.id;
        preparedMeasurement.rowVersion = this.measurement.rowVersion;
        preparedMeasurement.measurementNumber = this.measurement.measurementNumber;
        preparedMeasurement.mainMeasurementId = this.measurement.mainMeasurementId;
        preparedMeasurement.mainMeasurementNumber = this.measurement.mainMeasurementNumber;

        preparedMeasurement.updatedOn = this.measurement.updatedOn;
        preparedMeasurement.updatedBy = this.measurement.updatedBy;

        preparedMeasurement.squadId = this.selectedSquad.id;
        preparedMeasurement.squadNumber = this.selectedSquad.squadNumber;

        preparedMeasurement.userId = this.selectedUser.id;
        preparedMeasurement.userFullName = this.selectedUser.name;

        preparedMeasurement.offerId = this.measurement.offerId;
        preparedMeasurement.offerNumber = this.measurement.offerNumber;

        preparedMeasurement.invoiceId = this.measurement.invoiceId;
        preparedMeasurement.invoiceNumber = this.measurement.invoiceNumber;

        preparedMeasurement.invoiceNumber = this.measurement.invoiceNumber;
        preparedMeasurement.constructionProject = this.measurement.constructionProject;
        preparedMeasurement.comment = this.measurement.comment;
        preparedMeasurement.personResponsibleAtCustomer = this.measurement.personResponsibleAtCustomer;
        preparedMeasurement.customerArea = this.measurement.customerArea;

        // if setted, this is a date
        preparedMeasurement.constructionPeriodStart =
            this.somethingAsDate(this.measurement.constructionPeriodStart, MeasurementViewModel.DATE_FORMAT_PIPE);
        preparedMeasurement.constructionPeriodEnd =
            this.somethingAsDate(this.measurement.constructionPeriodEnd, MeasurementViewModel.DATE_FORMAT_PIPE);
        preparedMeasurement.accountingPeriod =
            this.somethingAsDate(this.measurement.accountingPeriod, MeasurementViewModel.DATE_FORMAT_PIPE);

        // objects
        // measurement part
        preparedMeasurement.measurementPart = this.selectedMeasurementPart ? this.selectedMeasurementPart.id : null;
        // state

        const state = f(this.measurement.state);

        preparedMeasurement.state = this.measurement.state;

        // lists
        // release orders
        preparedMeasurement.releaseOrders = this.releaseOrdersSelectItems.map(item => item.value);

        // positions
        preparedMeasurement.positions = this.preparePositionUpdate();

        return preparedMeasurement;
    }

    private preparePositionUpdate(): MeasurementPosition[] {

        const measurementPositions: MeasurementPosition[] = [];

        for (const measurementPositionModel of this.measurementPositionModels) {

            const measurementPosition: MeasurementPosition = {};

            // local data
            measurementPosition.id = measurementPositionModel.id;
            measurementPosition.measurementId = measurementPositionModel.measurementId;

            measurementPosition.sequenceNumber = measurementPositionModel.sequenceNumber;
            measurementPosition.positionNumber = measurementPositionModel.positionNumber;
            measurementPosition.multiplier = measurementPositionModel.multiplier;
            measurementPosition.length = measurementPositionModel.length;
            measurementPosition.width = measurementPositionModel.width;
            measurementPosition.height = measurementPositionModel.height;
            measurementPosition.product = measurementPositionModel.product;
            measurementPosition.unit = measurementPositionModel.unit;
            measurementPosition.serviceDescription = measurementPositionModel.serviceDescription;
            measurementPosition.comment = measurementPositionModel.comment;
            measurementPosition.unitSalary = measurementPositionModel.unitSalary;

            measurementPositions.push(measurementPosition);

        }

        return measurementPositions;
    }

    addOrUpdateReleaseOrder(releaseOrder: ReleaseOrder) {
        // add to existing list
        this.measurement.releaseOrders.push(releaseOrder);

        this.initReleaseOrders();
    }

    public productUpdateEvent(measurementPositionModel: MeasurementPositionModel) {

        if (measurementPositionModel.multiplier &&
            measurementPositionModel.length &&
            measurementPositionModel.width &&
            measurementPositionModel.length) {

            measurementPositionModel.product =
                measurementPositionModel.multiplier *
                measurementPositionModel.length *
                measurementPositionModel.width *
                measurementPositionModel.height;
        } else {
            measurementPositionModel.product = 0;
        }
    }


}

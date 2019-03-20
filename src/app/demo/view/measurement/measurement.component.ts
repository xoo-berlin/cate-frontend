import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {
    ALL_MEASUREMENT_PARTS,
    DEFAULT,
    MAIN,
    MEASUREMENT_PART_MAPPING,
    NONE,
    PARTIAL
} from "../../model/domain/measurement/MeasurementPart";
import {NodeService} from '../../service/nodeservice';
import {MenuItem, DialogService, MessageService} from 'primeng/primeng';
import {CurrencyPipe} from '@angular/common';
import {MeasurementPositionModel} from '../../model/component/measurement/MeasurementPositionModel';

// model
import {HistoryItem} from '../../model/domain/history/HistoryItem';
import {Measurement} from '../../model/domain/measurement/Measurement';
import {Purchase} from '../../model/domain/purchase/Purchase';
import {ReleaseOrder} from '../../model/domain/measurement/ReleaseOrder';
import {Squad} from '../../model/domain/squad/Squad';
import {User} from '../../../cate/model/user/response/User';

// services
import {CustomerAreaService} from '../../service/measurement/CustomerAreaService';
import {MeasurementService} from '../../service/measurement/MeasurementService';
import {SquadService} from '../../service/squad/SquadService';
import {StateService} from '../../service/common/StateService';
import {UnitService} from '../../service/common/UnitService';
import {UserService} from '../../service/user/UserService';

// custom components
import {HistorySearchDialogComponent} from '../history/history-search-dialog.component';
import {SquadSearchDialogComponent} from '../squad/squad-search-dialog.component';
import {UserSearchDialogComponent} from '../user/user-search-dialog.component';
import {Locales} from '../../../../const/Locales';
import {MeasurementViewModel} from './meaurement.view.model';
import {MeasurementResponse} from '../../model/domain/measurement/response/MeasurementResponse';


@Component({
    templateUrl: './measurement.component.html',
    providers: [DialogService, MessageService]
})
export class MeasurementComponent implements OnInit {

    // local reference for a locale for calendar rendering and easy access
    locale = Locales.localeDE;

    // selected / new measurement

    measurementVM = new MeasurementViewModel();

    // release order dialog
    displayReleaseOrderDialog: boolean;
    releaseOrderEdit: ReleaseOrder = {};
    releaseOrderPurchasesSuggest: Purchase[];
    releaseOrderPurchase: Purchase;

    allReleaseOrdersSuggest: Purchase[] = [];

    // positions table
    allAvailableCols: any[];
    selectedCols: any[];

    // Menu
    menuItems: MenuItem[];

    // PDF
    displayPdfDialog: boolean;
    pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    page = 1;
    totalPages: number;
    isLoaded = false;

    constructor(private route: ActivatedRoute,
                private dialogService: DialogService,
                private messageService: MessageService,
                private nodeService: NodeService,
                private http: HttpClient,
                private currencyPipe: CurrencyPipe,
                private customerAreaService: CustomerAreaService,
                private measurementService: MeasurementService,
                private squadService: SquadService,
                private stateService: StateService,
                private unitService: UnitService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.measurementVM.squadByIdFn = (squadId) => {
            return this.squadService.getById(squadId);
        };
        this.measurementVM.userByIdFn = (userId) => {
            return this.userService.getById(userId);
        };
        this.measurementVM.allUsersFn = () => {
            return this.userService.all().then(item => item.items);
        };
        this.measurementVM.allMeasurementPartsFn = () => {
            return ALL_MEASUREMENT_PARTS;
        };

        this.measurementVM.measurementPartFromStringFn = (candidate: string) => {
            if (MEASUREMENT_PART_MAPPING.has(candidate)) {
                return MEASUREMENT_PART_MAPPING.get(candidate);
            } else {
                return DEFAULT;
            }
        };

        // Static Initialization
        this.customerAreaService.all()
            .then(items => {
                this.measurementVM.initializeCustomerAreas(items);
            });

        this.stateService.all()
            .then(items => {
                this.measurementVM.initStates(items);
            });

        this.unitService.all()
            .then(items => {
                this.measurementVM.initUnits(items);
            });

        let id: any;
        let url: any;

        this.route.url.subscribe(segments => url = segments.join(''));
        this.route.params.subscribe(p => id = p.id);

        console.log(`id: ${id}`);
        console.log(`url: ${url}`);

        if (id) {
            console.log('Load Id: ' + id);
            this.measurementService.id(id)
                .then(item => this.initMeasurement(item))
                .catch(reason => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Fehler',
                        detail: 'Fehler beim Laden des Aufmaßes Nr. ' + id
                    });

                    const measurement: Measurement = {state: {id: 0, name: ''}};
                    this.initMeasurement(measurement);
                });
        } else {
            console.log('Creating new');
            const measurement: Measurement = {state: {id: 0, name: ''}};
            this.initMeasurement(measurement);
        }


        this.allAvailableCols = [
            {field: 'id', header: 'Aufmass Id', width: 100},
            {field: 'sequenceNumber', header: 'Laufende Nummer', width: 75},
            {field: 'positionNumber', header: 'Position', width: 75},
            {field: 'multiplier', header: 'Faktor', width: 75},
            {field: 'length', header: 'Länge', width: 75},
            {field: 'width', header: 'Breite', width: 75},
            {field: 'height', header: 'Höhe', width: 75},
            {field: 'unit', header: 'Einheit', width: 100},
            {field: 'serviceDescription', header: 'Art der Leistung'},
            {field: 'comment', header: 'Bemerkung'},
            {field: 'unitSalary', header: 'Einheitslohn'}
        ];

        this.selectedCols = [
            {field: 'sequenceNumber', header: 'Laufende Nummer', width: 75},
            {field: 'positionNumber', header: 'Position', width: 75},
            {field: 'multiplier', header: 'Faktor', width: 75},
            {field: 'length', header: 'Länge', width: 75},
            {field: 'width', header: 'Breite', width: 75},
            {field: 'height', header: 'Höhe', width: 75},
            {field: 'product', header: 'Produkt', width: 100},
            {field: 'unit', header: 'Einheit', width: 100},
            {field: 'serviceDescription', header: 'Art der Leistung'},
            {field: 'comment', header: 'Bemerkung'},
            {field: 'unitSalary', header: 'Einheitslohn', width: 75}
        ];

        this.allReleaseOrdersSuggest = [];
        this.allReleaseOrdersSuggest.push({id: 1, name: 'irgendeine Bestellung 1'});
        this.allReleaseOrdersSuggest.push({id: 2, name: 'irgendeine Bestellung 2'});
        this.allReleaseOrdersSuggest.push({id: 3, name: 'irgendeine Bestellung 3'});
        this.allReleaseOrdersSuggest.push({id: 4, name: 'irgendeine Bestellung 4'});
        this.allReleaseOrdersSuggest.push({id: 5, name: 'irgendeine Bestellung 5'});

        this.menuItems = [
            {
                label: 'Aufmaß',
                icon: 'fa fa-fw fa-file-o',
                items: [
                    {label: 'Neu', icon: 'fa fa-fw fa-plus'},
                    {
                        label: 'Speichern', icon: 'fa fa-fw fa-save', command: (event) => {
                            // event.originalEvent: Browser event
                            // event.item: menuitem metadata
                            this.save();
                        }
                    },
                    {
                        label: 'Neu Laden', icon: 'fa fa-fw fa-refresh', command: (event) => {
                            // event.originalEvent: Browser event
                            // event.item: menuitem metadata
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Info',
                                detail: 'Datensatz neu geladen!'
                            });
                        }
                    },
                    {label: 'Schliessen', icon: 'fa fa-fw fa-minus', routerLink: '/measurements'}
                ]
            },
            {
                label: 'Drucken',
                icon: 'fa fa-fw fa-print',
                items: [
                    {
                        label: 'Dokument 1 (inline)', command: (event) => {
                            this.showPdfDialog();
                        }
                    },
                    {
                        label: 'Dokument 2 (new window)', command: (event) => {
                            const obs: Observable<Blob> = this.downloadPDF(this.pdfSrc);

                            obs.subscribe(res => {
                                const fileURL = URL.createObjectURL(res);
                                window.open(fileURL, '_blank');
                            });
                        }
                    },
                    {label: 'Dokument 3'}
                ]
            },
            {
                label: 'Historie',
                icon: 'fa fa-fw fa-history',
                command: (event) => {
                    this.showHistorySearchDialog();
                }
            }
        ];

    }

    showPdfDialog() {
        this.displayPdfDialog = true;
    }

    downloadPDF(url): any {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');
        return this.http.get(url, {headers: headers, responseType: 'blob'});
    }

    afterLoadComplete(pdfData: any) {
        this.totalPages = pdfData.numPages;
        this.isLoaded = true;
    }

    nextPage() {
        this.page++;
    }

    prevPage() {
        this.page--;
    }

    showHistorySearchDialog() {
        // entity class
        // entity id

        const ref = this.dialogService.open(HistorySearchDialogComponent, {
            header: 'Historie zum Datensatz',
            width: '70%',
            contentStyle: {'min-height': '350px', 'max-height': '350px', 'overflow': 'auto'},
            data: {
                entityClazz: 'measurement',
                entityId: this.measurementVM.measurement.id
            }
        });

        ref.onClose.subscribe((historyItem: HistoryItem) => {
            if (historyItem) {
                this.messageService.add({
                    severity: 'info',
                    summary: 'History Item gewählt',
                    detail: 'Id:' + historyItem.id
                });
            } else {
                // this.messageService.add({severity: 'info', summary: 'Keine Auswahl getroffen', detail: ''});
            }
        });
    }


    initMeasurement(measurement: MeasurementResponse) {
        console.log('Initializing View Model');
        const measurementInVM = this.measurementVM.init(measurement);
        console.log('Initializing View Model - Done');
        console.log(measurementInVM);
    }

    showSquadSearchDialog() {
        // entity class
        // entity id

        const ref = this.dialogService.open(SquadSearchDialogComponent, {
            header: 'Suche / Auswahl eines Bautrupps',
            width: '70%',
            contentStyle: {'min-height': '350px', 'max-height': '350px', 'overflow': 'auto'}
        });

        ref.onClose.subscribe((squad: Squad) => this.applySquad(squad));
    }

    showUserSearchDialog() {
        // entity class
        // entity id

        const ref = this.dialogService.open(UserSearchDialogComponent, {
            header: 'Suche / Auswahl eines Mitarbeiters',
            width: '70%',
            contentStyle: {'min-height': '350px', 'max-height': '350px', 'overflow': 'auto'}
        });

        ref.onClose.subscribe((user: User) => this.applyUser(user));
    }

    squadNumberOnEnter(squadNumberCandidate: string) {
        // input is a integer, so we can cast
        const squadNumber: number = Number(squadNumberCandidate);
        // check if squad can be found
        // if not, show error
        this.squadService.getBySquadNumber(squadNumber)
            .then(squad => this.applySquad(squad))
            .catch(reason => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Bautrupp nicht gefunden',
                    detail: 'Bautrupp mit Bautrupp Nummer:' + squadNumber + ' nicht gefunden.'
                });
            });
    }

    applyUser(user: User) {
        if (this.measurementVM.selectUser(user)) {
            this.messageService.add({
                severity: 'info',
                summary: 'Mitarbeiter gewählt',
                detail: 'Id:' + user.id + ' / ' + user.name
            });
        }
    }

    applySquad(squad: Squad) {
        if (this.measurementVM.selectSquad(squad)) {
            this.messageService.add({
                severity: 'info',
                summary: 'Bautrupp gewählt',
                detail: 'Id:' + squad.id + ' / ' + squad.squadNumber
            });
        }
    }

    sumSalary() {
        const value = -1;
        // {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
        return this.currencyPipe.transform(value, 'EUR', 'code', '1.0-0'); // $12,345
    }

    sumValue() {
        const value = -1;
        // code, symbol, symbol-narrow
        return this.currencyPipe.transform(value, 'EUR', 'symbol', '1.0-0'); // $12,345
    }

    productUpdateEvent(measurementModel: MeasurementPositionModel) {
        if (measurementModel) {
            this.measurementVM.productUpdateEvent(measurementModel);
        }
    }

    save() {
        const measurementUpdated = this.measurementVM.prepareUpdate();

        this.measurementService
            .save(measurementUpdated)
            .subscribe((measurement: Measurement) => {
                console.log(measurement);

                this.measurementVM.init(measurement);

                this.messageService.add({
                    severity: 'info',
                    summary: 'Speichern erfolgreich',
                    detail: 'Aufmass: ' + measurement.id
                });
            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Fehler beim Speichern',
                    detail: 'Fehler: ' + error.error
                });
            }); // error path
    }

    filterReleaseOrderPurchases(event) {
        this.releaseOrderPurchasesSuggest = [];
        for (let i = 0; i < this.allReleaseOrdersSuggest.length; i++) {
            const purchase = this.allReleaseOrdersSuggest[i];
            if (purchase.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0) {
                this.releaseOrderPurchasesSuggest.push(purchase);
            }
        }
    }

    filterUsers(event) {
        this.measurementVM.suggestUsers(event.query)
            .then(users => {
                console.log('Users: ');
                console.log(users);
            });
    }

    createNewCallOrder() {
        this.releaseOrderEdit = {};
        this.displayReleaseOrderDialog = true;
    }

    findMatchingPurchasesNumbers() {
        this.releaseOrderPurchasesSuggest = [];
        this.releaseOrderPurchasesSuggest.push({id: 1, name: 'irgendeine Bestellung 1'});
        this.releaseOrderPurchasesSuggest.push({id: 2, name: 'irgendeine Bestellung 2'});
        this.releaseOrderPurchasesSuggest.push({id: 3, name: 'irgendeine Bestellung 3'});
        this.releaseOrderPurchasesSuggest.push({id: 4, name: 'irgendeine Bestellung 4'});
        this.releaseOrderPurchasesSuggest.push({id: 5, name: 'irgendeine Bestellung 5'});

    }

    saveReleaseOrder() {
        // todo validation

        // create / update local object
        const releaseOrder: ReleaseOrder = {
            name: this.releaseOrderEdit.name,
            purchaseId: this.releaseOrderEdit.purchaseId,
            purchaseNumber: this.releaseOrderEdit.purchaseNumber,
            measurementType: this.releaseOrderEdit.measurementType
        };

        this.measurementVM.addOrUpdateReleaseOrder(releaseOrder);

        // close dialog
        this.displayReleaseOrderDialog = false;
    }

}

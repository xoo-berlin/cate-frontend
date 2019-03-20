import {LOCALE_ID, NgModule} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CurrencyPipe, LocationStrategy, HashLocationStrategy, registerLocaleData} from '@angular/common';
import {AppRoutes} from './app.routes';

// Modules
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';

import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {GrowlModule} from 'primeng/growl';
import {InplaceModule} from 'primeng/inplace';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {SplitButtonModule} from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {KeyFilterModule} from 'primeng/keyfilter';

// custom modules
import {DynamicDialogModule} from 'primeng/components/dynamicdialog/dynamicdialog';

// Components
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {DateFormatPipe} from '../const/DateFormatPipe';
import {ContactComponent} from './demo/view/contact/contact.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';

import {PdfViewerModule} from 'ng2-pdf-viewer';

import {CustomerSearchDialogComponent} from './demo/view/customer/customer-search-dialog.component';
import {HistorySearchDialogComponent} from './demo/view/history/history-search-dialog.component';
import {MeasurementSearchDialogComponent} from './demo/view/measurement/measurement-search-dialog.component';
import {SquadSearchDialogComponent} from './demo/view/squad/squad-search-dialog.component';
import {UserSearchDialogComponent} from './demo/view/user/user-search-dialog.component';

import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {MeasurementComponent} from './demo/view/measurement/measurement.component';
import {MeasurementsComponent} from './demo/view/measurement/measurements.component';
import {MeasurementSearchComponent} from './demo/view/measurement/search.component';
import {InvoiceComponent} from './demo/view/invoice/invoice.component';
import {InvoicesComponent} from './demo/view/invoice/invoices.component';
import {InvoiceSearchComponent} from './demo/view/invoice/search.component';

// Services
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';

import {CarService} from './demo/service/carservice';
import {CustomerService} from './demo/service/customer/CustomerService';
import {CustomerAreaService} from './demo/service/measurement/CustomerAreaService';
import {HistoryService} from './demo/service/history/HistoryService';
import {InvoiceService} from './demo/service/invoice/InvoiceService';
import {MeasurementService} from './demo/service/measurement/MeasurementService';
import {SquadService} from './demo/service/squad/SquadService';
import {StateService} from './demo/service/common/StateService';
import {UnitService} from './demo/service/common/UnitService';
import {UserService} from './demo/service/user/UserService';


registerLocaleData(localeDe);

@NgModule({
    entryComponents: [
        CustomerSearchDialogComponent,
        MeasurementSearchDialogComponent,
        HistorySearchDialogComponent,
        SquadSearchDialogComponent,
        UserSearchDialogComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        KeyFilterModule,
        DynamicDialogModule,
        PdfViewerModule
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent,

        CustomerSearchDialogComponent,
        MeasurementSearchDialogComponent,
        HistorySearchDialogComponent,
        SquadSearchDialogComponent,
        UserSearchDialogComponent,

        ContactComponent,
        MeasurementComponent,
        MeasurementsComponent,
        MeasurementSearchComponent,
        InvoiceComponent,
        InvoicesComponent,
        InvoiceSearchComponent,
        EmptyDemoComponent,
        DateFormatPipe
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: LOCALE_ID, useValue: 'de'},
        CurrencyPipe,
        CarService,
        CustomerService,
        MeasurementService,
        InvoiceService, HistoryService,
        CustomerAreaService, SquadService, StateService, UnitService, UserService,
        EventService, NodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

// PDF Viewer Module
// platformBrowserDynamic().bootstrapModule(AppModule);

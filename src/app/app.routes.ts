import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';

import {ContactComponent} from './demo/view/contact/contact.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {InvoiceComponent} from './demo/view/invoice/invoice.component';
import {InvoicesComponent} from './demo/view/invoice/invoices.component';
import {InvoiceSearchComponent} from './demo/view/invoice/search.component';
import {MeasurementsComponent} from './demo/view/measurement/measurements.component';
import {MeasurementComponent} from './demo/view/measurement/measurement.component';
import {MeasurementSearchComponent} from './demo/view/measurement/search.component';

export const routes: Routes = [
    {path: '', component: DashboardDemoComponent},

    {path: 'contact', component: ContactComponent},

    {path: 'measurements', component: MeasurementsComponent},
    {path: 'measurements/_search', component: MeasurementSearchComponent},
    {path: 'measurements/_new', component: MeasurementComponent},
    {path: 'measurements/:id', component: MeasurementComponent},

    {path: 'invoices', component: InvoicesComponent},
    {path: 'invoice', component: InvoiceComponent},
    {path: 'invoices/_search', component: InvoiceSearchComponent},

    {path: 'empty', component: EmptyDemoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});

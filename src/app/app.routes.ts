import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {ContactComponent} from './cate/view/contact/contact.component';
import {EmptyDemoComponent} from './cate/view/emptydemo.component';
import {OrganizationDemoComponent} from './cate/view/organizationdemo/organization-demo.component';
import {SearchComponent} from './cate/view/search/search.component';

export const routes: Routes = [
    {path: '', component: SearchComponent},

    {path: 'contact', component: ContactComponent},
    {path: 'organizationdemo', component: OrganizationDemoComponent},

    {path: 'empty', component: EmptyDemoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});

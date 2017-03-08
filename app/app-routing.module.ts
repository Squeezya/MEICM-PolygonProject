import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {MapComponent}  from './map/map.component';
import {NotFoundComponent}  from './notfound/notfound.component';
import {OperationsComponent} from "./operation/operations.component";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'operations', component: OperationsComponent},
    {path: 'map', component: MapComponent},
    // all other routes and finally at the last add
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

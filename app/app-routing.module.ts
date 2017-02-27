import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {HeroesComponent}      from './heroes/heroes.component';
import {HeroDetailComponent}  from './hero-detail/hero-detail.component';
import {MapComponent}  from './map/map.component';
import {NotFoundComponent}  from './notfound/notfound.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'detail/:id', component: HeroDetailComponent},
    {path: 'heroes', component: HeroesComponent},
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

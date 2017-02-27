import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'GIS4STRAIT';
    routes: {
        title: String;
        url: String;
        activeClass: String;
    }[] = [
        {
            title: "Dashboard",
            url: "/dashboard",
            activeClass: "active"
        },
        {
            title: "Heroes",
            url: "/heroes",
            activeClass: "active"
        },
        {
            title: "Map",
            url: "/map",
            activeClass: "active"
        }
    ];
}
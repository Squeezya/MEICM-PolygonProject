import {
    Component,
    OnInit,
    Input,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import {Coordinate} from './../models/coordinate';
import {CoordinateService} from './../services/coordinate.service';

import {LatLngLiteral} from 'angular2-google-maps/core';

@Component({
    moduleId: module.id,
    selector: 'map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css'],
    animations: [
        trigger('sidebarContainerState', [
            state('inactive', style({
                'left': "-408px"
            })),
            state('active', style({
                left: "0px",
                'box-shadow': "0 0 20px rgba(0,0,0,0.3)"
            })),
            transition('inactive => active', animate('130ms ease-in')),
            transition('active => inactive', animate('130ms ease-out'))
        ])
    ]
})

export class MapComponent implements OnInit {
    a = "s";
    path: Coordinate[];
    pathColor: string;
    polygonPath: Array<LatLngLiteral>;
    polygonPath2: Array<LatLngLiteral>;
    pathAux: Coordinate[];
    markers: Coordinate[];
    pathAuxColor: string;

    sidebarConfig: {
        state: String;
    } = {
        state: "active"
    };

    mapConfig: {
        lat: number;
        lng: number;
        zoom: number;
        scaleControl: boolean;
        zoomControl: boolean;
        mapTypeControl: boolean;
        streetViewControl: boolean;
    } = {
        lat: 39.740159,
        lng: -8.797335,
        zoom: 16,
        scaleControl: true,
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: false
    };
    polygonConfig: {
        strokeColor: string;
        fillColor: string;
        strokeWeight: number;
    } = {
        strokeColor: "#8ab5e3",
        fillColor: "#8ab5e3",
        strokeWeight: 0
    };

    constructor(private coordinateService: CoordinateService) {
    }

    ngOnInit(): void {
        this.pathAux = [];
        this.markers = [];
        this.polygonPath = [];
        this.polygonPath2 = [];
        this.pathAuxColor = "#FF0000";
        this.pathColor = "#FF0000";
        this.getPath(3);
    }

    click(): void {
        console.log(document.querySelector('.sebm-google-map-container-inner'));
    }

    sidebarToggleState(): void {
        if (this.isSidebarVisible()) {
            this.sidebarConfig.state = 'inactive';
        } else {
            this.sidebarConfig.state = 'active';
        }
    }

    isSidebarVisible(): boolean {
        return this.sidebarConfig.state === "active";
    }

    getPath(index: number): void {
        this.coordinateService.getPath(index).then(path => {
            this.path = path;
            //center map on the beginning of the path
            this.mapConfig.lat = this.path[0].latitude;
            this.mapConfig.lng = this.path[0].longitude;
            this.polygonPath = [];
            this.polygonPath2 = [];
            var auxPath = this.getRawPolygonPath(this.path, 0.008);
            var auxPath2 = this.getRawPolygonPath(this.path, 0.016);
            for (var i = 0; i < auxPath.length; i++) {
                this.polygonPath.push({lat: auxPath[i].latitude, lng: auxPath[i].longitude});
            }
            for (var i = 0; i < auxPath2.length; i++) {
                this.polygonPath2.push({lat: auxPath2[i].latitude, lng: auxPath2[i].longitude});
            }
        });
    }

    clearPathAux(): void {
        this.pathAux.length = 0;
    }

    mapClicked($event: MouseEvent) {
        this.pathAux.push(new Coordinate($event.x, $event.y));
    }

    PrintCurrentPathAux(): void {
        var output = "[\n";
        for (let coordinate of this.pathAux) {
            output += coordinate.toStringProg() + "\n";
        }
        output += "]\n";
        console.log(output);
    }

    getRawPolygonPath(path: Coordinate[], dogSmeelDistanceInKm: number): Coordinate[] {
        // for path.length - 1 because on each iteration we will fetch the next one.
        // Without -1 it would give an array out of bounds error
        var pathSide1: Coordinate[] = [];
        var pathSide2: Coordinate[] = [];
        for (var i = 0; i < path.length - 1; i++) {
            var c1: Coordinate = path[i];
            var c2: Coordinate = path[i + 1];
            //angle between these 2 angles (0 degrees to north).
            var angle = c1.angleFromCoordinate(c2);
            var c1Aux1, c1Aux2, c2Aux1, c2Aux2: Coordinate;
            c1Aux1 = c1.destinationPoint(angle + 90, dogSmeelDistanceInKm);
            c1Aux2 = c1.destinationPoint(angle - 90, dogSmeelDistanceInKm);
            c2Aux1 = c2.destinationPoint(angle + 90, dogSmeelDistanceInKm);
            c2Aux2 = c2.destinationPoint(angle - 90, dogSmeelDistanceInKm);

            pathSide1.push(c1Aux1);
            pathSide1.push(c2Aux1);
            pathSide2.push(c1Aux2);
            pathSide2.push(c2Aux2);
        }
        pathSide2 = pathSide2.reverse();
        var polygonPath = pathSide1.concat(pathSide2);
        return polygonPath;
    }

    insidePolygon(latitude: number, longitude: number, vs: Coordinate[]): boolean {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].latitude, yi = vs[i].longitude;
            var xj = vs[j].latitude, yj = vs[j].longitude;

            var intersect = ((yi > longitude) != (yj > longitude))
                && (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };
}


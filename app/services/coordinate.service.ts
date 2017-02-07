import {Injectable} from '@angular/core';

import { Coordinate } from './../models/coordinate';
import { PATHS } from './../mocks/mock-paths';

@Injectable()
export class CoordinateService {
    getPath(i): Promise<Coordinate[]> {
        return Promise.resolve(PATHS[i]);
    }

    getPathSlowly(i): Promise<Coordinate[]> {
        return new Promise<Coordinate[]>(resolve =>
            setTimeout(resolve, 500)) // delay 2 seconds
            .then(() => this.getPath(i));
    }
}

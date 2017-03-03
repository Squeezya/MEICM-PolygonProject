import {Coordinate} from "./coordinate";
export class Sweep {
    id: string;
    operation_id: string;
    path: Coordinate[];
    created_at: Date;
    updated_at: Date;

    constructor(id: string, operation_id: string, path: Coordinate[], created_at: Date, updated_at: Date) {
        this.id = id;
        this.operation_id = operation_id;
        this.path = path;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public static fromObject(json: any): Sweep {
        return new Sweep(json.id, json.operation_id, Coordinate.fromObject(JSON.parse(json.path)), new Date(json.created_at), new Date(json.updated_at));
    }
}
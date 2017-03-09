import {Sweep} from "./sweep";

export class Operation {

    id: string;
    name: string;
    sweeps: Sweep[];
    created_at: Date;
    updated_at: Date;

    constructor(id: string, name: string, sweeps: Sweep[], created_at: Date, updated_at: Date) {
        this.id = id;
        this.name = name;
        this.sweeps = sweeps;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public static fromObject(json: any): Operation {
        let sweeps: Sweep[] = [];
        if (json.sweeps) {
            for (let i = 0; i < json.sweeps.length; i++) {
                sweeps.push(Sweep.fromObject(json.sweeps[i]));
            }
        }
        return new Operation(json.id, json.name, sweeps, new Date(json.created_at), new Date(json.updated_at));
    }
}
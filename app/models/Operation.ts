import {Sweep} from "./sweep";

export class Operation {

    id: string;
    name: string;
    sweeps: Sweep[];
    created_at: Date;
    updated_at: Date;

    constructor() {
    }

    public static fromObject(json: any): Operation {
        let sweeps: Sweep[] = [];
        if (json.sweeps) {
            for (let i = 0; i < json.sweeps.length; i++) {
                sweeps.push(Sweep.fromObject(json.sweeps[i]));
            }
        }
        let operation = new Operation();
        operation.id = json.id;
        operation.name = json.name;
        operation.sweeps = sweeps;
        operation.created_at = new Date(json.created_at);
        operation.updated_at = new Date(json.updated_at);
        return operation;
    }
}
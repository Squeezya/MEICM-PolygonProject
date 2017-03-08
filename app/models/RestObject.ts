export class RestObject<T> {
    items: T[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;

    constructor() {
        this.items = [];
    }
}
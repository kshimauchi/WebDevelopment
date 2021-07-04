export class DatabaseConnectionError extends Error {
    reason = "Error Connectiong to database";

    constructor() {
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
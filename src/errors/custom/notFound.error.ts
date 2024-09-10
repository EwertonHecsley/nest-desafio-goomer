import { GenericBaseErrors } from "../generic.error";

export class NotFoundError extends GenericBaseErrors {
    constructor() {
        super("Not Found");
    }
};
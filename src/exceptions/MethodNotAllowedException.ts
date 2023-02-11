import { IException } from "@interfaces";

export class MethodNotAllowedException extends IException {
    constructor(message?: string) {
        super(405, message);
    }
}

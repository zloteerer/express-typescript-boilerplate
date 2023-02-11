import { IException } from "@interfaces";

export class InternalServerErrorException extends IException {
    constructor(message?: string) {
        super(500, message);
    }
}

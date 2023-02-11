import { NextFunction, Request, Response } from "express";
import { IException } from "@interfaces";
import { Express } from "express";
import { env } from "@providers";
import { NotFoundException } from "@exceptions";

class ErrorHandlerMiddleware {
    public catch(express: Express) {
        express.all("*", (req: Request, res: Response, next: NextFunction) => {
            next(new NotFoundException());
        });
    }
    public logger() {}
    public handler(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        if (err instanceof IException) {
            return res.status(err.status).json(err.json());
        } else {
            const exception = new IException(
                500,
                env.isDevelopment ? err.message : undefined,
                err.stack,
            );
            return res.status(exception.status).json(exception.json());
        }
    }
}

export default new ErrorHandlerMiddleware();

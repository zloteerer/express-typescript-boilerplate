import { NextFunction, Request, Response } from "express";
import { IException } from "@interfaces";
import { Express } from "express";
import { env } from "@providers";

class ErrorHandlerMiddleware {
    public catch(express: Express) {
        express.all("*", (req: Request, res: Response) => {
            return res.status(404).json("Not found");
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

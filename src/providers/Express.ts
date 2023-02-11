import express, { Response, Request } from "express";
import { Express as NativeExpress } from "express";
import { env } from "@providers";
import { ErrorHandlerMiddleware } from "@middlewares";

class Express {
    private express: NativeExpress;

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.handler();
    }

    public middlewares(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    public routes(): void {}

    public handler(): void {
        ErrorHandlerMiddleware.catch(this.express);
        this.express.use(ErrorHandlerMiddleware.logger);
        this.express.use(ErrorHandlerMiddleware.handler);
    }

    public init(): void {
        this.express.listen(env.API_PORT, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on ${env.API_HOST}:${env.API_PORT}`);
        });
    }
}

export default Express;

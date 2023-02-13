import express from "express";
import { Express as NativeExpress } from "express";
import { ErrorHandlerMiddleware } from "@middlewares";
import { Logger, env, Morgan } from "@providers";
import { Server } from "http";

class Express {
    private express: NativeExpress;
    private server?: Server;

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
        this.handler();
    }

    public middlewares(): void {
        this.express.use(Morgan.mount());

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
        this.server = this.express.listen(env.API_PORT, (err?: any) => {
            if (err) throw err;
            Logger.info(`> Ready on ${env.API_HOST}:${env.API_PORT}`);
        });
    }

    public close(): void {
        if (this.server) this.server.close();
    }
}

export default Express;

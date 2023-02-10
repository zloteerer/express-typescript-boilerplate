import express from "express";
import { Express as NativeExpress, Request, Response } from "express";
import { env } from "@providers";

class Express {
    private app: NativeExpress;

    constructor() {
        this.app = express();
        this.middleware();
        this.listen();
    }

    middleware = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // this.app.use(env.API_ROUTE_PREFIX, routes);
        this.app.all("*", (req: Request, res: Response) => {
            return res.status(404).json("Not found");
        });
        // this.app.use(errorHandler);
    };

    listen = () => {
        this.app.listen(env.API_PORT, (err?: any) => {
            if (err) throw err;
            console.log(`> Ready on ${env.API_HOST}:${env.API_PORT}`);
        });
    };
}

export default Express;

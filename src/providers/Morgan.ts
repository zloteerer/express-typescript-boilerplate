import morgan from "morgan";
import { Logger, env } from "@providers";
import { Request, Response } from "express";

class Morgan {
    public mount = () => {
        return morgan(
            ":remote-addr :method :url :status :res[content-length] - :response-time ms",
            {
                stream: this.stream(),
                skip: this.skip(),
            },
        );
    };

    private stream() {
        return {
            write: (message: string) => Logger.http(message.trim()),
        };
    }

    private skip() {
        return (req: Request, res: Response) => {
            return !env.isDevelopment || res.statusCode >= 400;
        };
    }
}

export default new Morgan();

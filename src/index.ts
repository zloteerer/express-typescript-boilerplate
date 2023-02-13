import { Express, Logger } from "@providers";

(async () => {
    process.on("uncaughtException", (exception) =>
        Logger.error("uncaughtException", {
            name: exception.name,
            error: exception.message,
            ...(exception.stack && { stack: exception.stack }),
        }),
    );
    process.on("warning", (warning) => Logger.warn(warning.stack));

    const server = new Express();
    try {
        server.init();
    } catch (e) {
        Logger.error(e);
        process.exit(1);
    }
})();

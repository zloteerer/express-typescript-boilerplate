import { Express } from "@providers";

(async () => {
    const server = new Express();
    try {
        server.init();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

import { Express } from "@providers";

(async () => {
    try {
        new Express();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

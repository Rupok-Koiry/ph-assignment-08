"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
/**
 * Main function to establish database connection and start the server.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Start the server and listen on the specified port from the configuration.
            server = app_1.default.listen(config_1.default.PORT, () => {
                console.log(`App is listening on port ${config_1.default.PORT}`);
            });
        }
        catch (err) {
            // Log any errors that occur during database connection or server startup.
            console.log(err);
        }
    });
}
// Execute the main function to initiate the application.
main();
/**
 * Handle unhandled promise rejections.
 * Gracefully shut down the server if an unhandled rejection occurs.
 */
process.on("unhandledRejection", () => {
    console.log(`😈 Unhandled rejection is detected, shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
/**
 * Handle uncaught exceptions.
 * Immediately shut down the application if an uncaught exception occurs.
 */
process.on("uncaughtException", () => {
    console.log(`😈 Uncaught Exception is detected, shutting down ...`);
    process.exit(1);
});

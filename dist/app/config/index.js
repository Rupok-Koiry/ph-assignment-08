"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from a .env file located at the root of the project
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
// Export configuration values sourced from environment variables
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
};

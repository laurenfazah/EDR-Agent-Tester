"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const fs_1 = __importDefault(require("fs"));
const logActivity = (activity) => {
    const logFilePath = './activity_log.json';
    const logEntry = JSON.stringify(activity);
    fs_1.default.appendFileSync(logFilePath, logEntry + '\n');
};
exports.logActivity = logActivity;

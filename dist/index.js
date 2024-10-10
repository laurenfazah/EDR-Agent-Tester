"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activities_1 = require("./activities");
const logger_1 = require("./logger");
const args = process.argv.slice(2);
const filePath = './file-create.txt';
const runSimulation = (args) => {
    const processStart = (0, activities_1.startProcess)('./scripts/http_request.sh', args);
    (0, logger_1.logActivity)(processStart);
    const fileCreation = (0, activities_1.createFile)(filePath, 'Hello world!');
    (0, logger_1.logActivity)(fileCreation);
    const fileModification = (0, activities_1.modifyFile)(filePath, 'This is a change.');
    (0, logger_1.logActivity)(fileModification);
    const fileDeletion = (0, activities_1.deleteFile)(filePath);
    (0, logger_1.logActivity)(fileDeletion);
    const networkActivity = (0, activities_1.establishNetworkConnection)('example.com', 80);
    (0, logger_1.logActivity)(networkActivity);
};
runSimulation(args);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activities_1 = require("./activities");
const logger_1 = require("./logger");
const runSimulation = () => {
    const processStart = (0, activities_1.startProcess)('./executable.js', ['arg1', 'arg2']);
    (0, logger_1.logActivity)(processStart);
    const fileCreation = (0, activities_1.createFile)('./file-create.md', 'Hello world!');
    (0, logger_1.logActivity)(fileCreation);
    const fileModification = (0, activities_1.modifyFile)('./file-modify.md', 'HELLO WORLD');
    (0, logger_1.logActivity)(fileModification);
    const fileDeletion = (0, activities_1.deleteFile)('./file-create.md');
    (0, logger_1.logActivity)(fileDeletion);
    const networkActivity = (0, activities_1.establishNetworkConnection)('192.123.1.1', 80, 1234);
    (0, logger_1.logActivity)(networkActivity);
};
runSimulation();

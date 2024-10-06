"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishNetworkConnection = exports.deleteFile = exports.modifyFile = exports.createFile = exports.startProcess = void 0;
const fs_1 = __importDefault(require("fs"));
const startProcess = (filePath, args) => {
    let timestamp = Date.now();
    // TODO: execute file at path
    console.log(filePath);
    return {
        timestamp: timestamp,
        username: '',
        processName: '',
        processId: '',
        processCommandLine: args.join()
    };
};
exports.startProcess = startProcess;
const createFile = (filePath, content) => {
    let timestamp = Date.now();
    fs_1.default.writeFileSync(filePath, content);
    return {
        timestamp: timestamp,
        username: '',
        processName: '',
        processId: '',
        processCommandLine: '',
        path: filePath,
        action: 'create'
    };
};
exports.createFile = createFile;
const modifyFile = (filePath, change) => {
    // TODO | QUESTION: what is being modified? contents?
    // would use fs.appendFile if we're adding to file
    // would use fs.writeFile if we're overwriting existing file contents (assuming this for now)
    let timestamp = Date.now();
    fs_1.default.writeFileSync(filePath, change);
    return {
        timestamp: timestamp,
        username: '',
        processName: '',
        processId: '',
        processCommandLine: '',
        path: filePath,
        action: 'modify'
    };
};
exports.modifyFile = modifyFile;
const deleteFile = (filePath) => {
    let timestamp = Date.now();
    fs_1.default.unlinkSync(filePath);
    return {
        timestamp: timestamp,
        username: '',
        processName: '',
        processId: '',
        processCommandLine: '',
        path: filePath,
        action: 'delete'
    };
};
exports.deleteFile = deleteFile;
const establishNetworkConnection = (dest, port, data) => {
    let timestamp = Date.now();
    return {
        timestamp: timestamp,
        username: '',
        processName: '',
        processId: '',
        processCommandLine: '',
        destinationAddress: dest,
        destinationPort: port,
        sourceAddress: dest, // TODO
        sourcePort: port, // TODO
        dataSentProtocol: data,
        protocol: ''
    };
};
exports.establishNetworkConnection = establishNetworkConnection;

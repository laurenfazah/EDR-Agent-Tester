"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishNetworkConnection = exports.deleteFile = exports.modifyFile = exports.createFile = exports.startProcess = void 0;
const fs_1 = __importDefault(require("fs"));
const net_1 = __importDefault(require("net"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const helpers_1 = require("./helpers");
const startProcess = (commandPath, args) => {
    const username = os_1.default.userInfo().username;
    const timestamp = Date.now();
    let command;
    let commandArgs;
    let processName;
    if (path_1.default.extname(commandPath) === '.sh') {
        command = 'bash';
        commandArgs = [commandPath, ...args];
        processName = 'bash';
    }
    else {
        command = commandPath;
        commandArgs = args;
        processName = path_1.default.basename(commandPath);
    }
    const childProcess = (0, child_process_1.spawn)(command, commandArgs);
    const commandLine = `${command} ${commandArgs.join(' ')}`;
    return {
        timestamp,
        username,
        processName,
        processId: childProcess.pid,
        processCommandLine: commandLine,
    };
};
exports.startProcess = startProcess;
const createFile = (path, content) => {
    const username = os_1.default.userInfo().username;
    const timestamp = Date.now();
    fs_1.default.writeFileSync(path, content);
    return {
        timestamp,
        username,
        processName: 'node',
        processId: process.pid,
        processCommandLine: `node -e "require('fs').writeFileSync(${path}, ${content})`,
        path,
        action: 'create'
    };
};
exports.createFile = createFile;
const modifyFile = (path, change) => {
    const username = os_1.default.userInfo().username;
    const timestamp = Date.now();
    fs_1.default.appendFileSync(path, `\n${change}`);
    return {
        timestamp,
        username,
        processName: 'node',
        processId: process.pid,
        processCommandLine: `node -e "require('fs').appendFileSync(${path}, \n${change})`,
        path,
        action: 'modify'
    };
};
exports.modifyFile = modifyFile;
const deleteFile = (path) => {
    const username = os_1.default.userInfo().username;
    const timestamp = Date.now();
    fs_1.default.unlinkSync(path);
    return {
        timestamp,
        username,
        processName: 'node',
        processId: process.pid,
        processCommandLine: `node -e "require('fs').unlinkSync(${path})`,
        path,
        action: 'delete'
    };
};
exports.deleteFile = deleteFile;
const establishNetworkConnection = (dest, port) => {
    const protocol = 'tcp';
    const sourceAddress = (0, helpers_1.getLocalIPAddress)() || '127.0.0.1';
    const username = os_1.default.userInfo().username;
    const client = new net_1.default.Socket();
    const timestamp = Date.now();
    let sourcePort = 0;
    let totalDataSent = 0;
    client.connect(port, dest, () => {
        sourcePort = client.localPort || 0;
        console.log(`Connecting from ${sourceAddress}:${sourcePort} to ${dest}:${port}`);
        const data = Buffer.from('This is a stand-in for transmitted data.');
        totalDataSent = data.length;
        client.write(data);
    });
    client.on('close', () => {
        console.log('Connection closed.');
    });
    client.on('error', (error) => {
        console.log(`Connection error: ${error.message}`);
    });
    return {
        timestamp,
        username,
        processName: 'node',
        processId: process.pid, // current node.js process
        processCommandLine: `node -e "require('net').Socket().connect(${port}, '${dest}')"`,
        destinationAddress: dest,
        destinationPort: port,
        sourceAddress,
        sourcePort,
        dataAmountSent: totalDataSent,
        protocol,
    };
};
exports.establishNetworkConnection = establishNetworkConnection;

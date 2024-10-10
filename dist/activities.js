"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishNetworkConnection = exports.deleteFile = exports.modifyFile = exports.createFile = exports.startProcess = void 0;
const fs_1 = __importDefault(require("fs"));
const net_1 = __importDefault(require("net"));
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
const helpers_1 = require("./helpers");
const startProcess = (path, args) => {
    const username = os_1.default.userInfo().username;
    const execCommand = `${path} ${args.join(' ')}`;
    const processId = (0, child_process_1.spawn)(path, args).pid;
    const timestamp = Date.now();
    (0, child_process_1.exec)(execCommand, (error, stdout, _stderr) => {
        if (error) {
            console.log(`Error executing process: ${error}`);
        }
        else {
            console.log(`Process output: ${stdout}`);
        }
    });
    return {
        timestamp,
        username,
        processName: path,
        processId: processId,
        processCommandLine: execCommand
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
        processCommandLine: `touch ${path}`,
        path,
        action: 'create'
    };
};
exports.createFile = createFile;
const modifyFile = (path, change) => {
    const username = os_1.default.userInfo().username;
    // TODO | QUESTION: what is being modified? contents?
    // would use fs.appendFile if we're adding to file
    // would use fs.writeFile if we're overwriting existing file contents (assuming this for now)
    const timestamp = Date.now();
    fs_1.default.writeFileSync(path, change);
    return {
        timestamp,
        username,
        processName: 'node',
        processId: process.pid,
        processCommandLine: `vim ${path}`,
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
        processCommandLine: `rm ${path}`,
        path,
        action: 'delete'
    };
};
exports.deleteFile = deleteFile;
const establishNetworkConnection = (dest, port) => {
    const protocol = 'tcp';
    const sourceAddress = (0, helpers_1.getLocalIPAddress)() || '127.0.0.1';
    const username = os_1.default.userInfo().username;
    const sourcePort = Math.floor(Math.random() * 10000);
    const client = new net_1.default.Socket();
    const timestamp = Date.now();
    let totalDataSent = 0;
    client.connect(port, dest, () => {
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
        processName: 'curl',
        processId: process.pid, // current node.js process
        processCommandLine: `curl http://${dest}:${port}`,
        destinationAddress: dest,
        destinationPort: port,
        sourceAddress,
        sourcePort,
        dataAmountSent: totalDataSent,
        protocol,
    };
};
exports.establishNetworkConnection = establishNetworkConnection;

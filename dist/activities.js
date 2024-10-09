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
const startProcess = (path, args) => {
    const username = os_1.default.userInfo().username;
    const execCommand = `${path} ${args.join(' ')}`;
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
        timestamp: timestamp,
        username: username,
        processName: path,
        processId: Math.floor(Math.random() * 10000),
        processCommandLine: execCommand
    };
};
exports.startProcess = startProcess;
const createFile = (filePath, content) => {
    const username = os_1.default.userInfo().username;
    let timestamp = Date.now();
    fs_1.default.writeFileSync(filePath, content);
    return {
        timestamp: timestamp,
        username: username,
        processName: 'touch',
        processId: Math.floor(Math.random() * 10000),
        processCommandLine: `touch ${filePath}`,
        path: filePath,
        action: 'create'
    };
};
exports.createFile = createFile;
const modifyFile = (filePath, change) => {
    const username = os_1.default.userInfo().username;
    // TODO | QUESTION: what is being modified? contents?
    // would use fs.appendFile if we're adding to file
    // would use fs.writeFile if we're overwriting existing file contents (assuming this for now)
    let timestamp = Date.now();
    fs_1.default.writeFileSync(filePath, change);
    return {
        timestamp: timestamp,
        username: username,
        processName: 'vim',
        processId: Math.floor(Math.random() * 10000),
        processCommandLine: `vim ${filePath}`,
        path: filePath,
        action: 'modify'
    };
};
exports.modifyFile = modifyFile;
const deleteFile = (filePath) => {
    const username = os_1.default.userInfo().username;
    let timestamp = Date.now();
    fs_1.default.unlinkSync(filePath);
    return {
        timestamp: timestamp,
        username: username,
        processName: 'rm',
        processId: Math.floor(Math.random() * 10000),
        processCommandLine: `rm ${filePath}`,
        path: filePath,
        action: 'delete'
    };
};
exports.deleteFile = deleteFile;
const establishNetworkConnection = (dest, port) => {
    const protocol = 'tcp';
    const sourceAddress = '127.0.0.1';
    const username = os_1.default.userInfo().username;
    const sourcePort = Math.floor(Math.random() * 10000);
    const client = new net_1.default.Socket();
    let totalDataSent = 0;
    let timestamp = Date.now();
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
        timestamp: timestamp,
        username: username,
        processName: 'curl',
        processId: Math.floor(Math.random() * 10000),
        processCommandLine: `curl http://${dest}:${port}`,
        destinationAddress: dest,
        destinationPort: port,
        sourceAddress: sourceAddress,
        sourcePort: sourcePort,
        dataAmountSent: totalDataSent,
        protocol: protocol
    };
};
exports.establishNetworkConnection = establishNetworkConnection;

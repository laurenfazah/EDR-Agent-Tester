import fs from 'fs';
import net from 'net';
import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import { BaseActivity, FileActivity, NetworkActivity } from './types';
import { getLocalIPAddress } from './helpers';

export const startProcess = (commandPath: string, args: string[]): BaseActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  let command: string;
  let commandArgs: string[];
  let processName: string;

  if (path.extname(commandPath) === '.sh') {
    command = 'bash';
    commandArgs = [commandPath, ...args];
    processName = 'bash';
  } else {
    command = commandPath;
    commandArgs = args;
    processName = path.basename(commandPath);
  }

  const childProcess = spawn(command, commandArgs);
  const commandLine = `${command} ${commandArgs.join(' ')}`;

  return {
    timestamp,
    username,
    processName,
    processId: childProcess.pid,
    processCommandLine: commandLine,
  };
};

export const createFile = (path: string, content: string): FileActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  fs.writeFileSync(path, content);

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

export const modifyFile = (path: string, change: string): FileActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  fs.appendFileSync(path, `\n${change}`);

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

export const deleteFile = (path: string): FileActivity => {
  const username = os.userInfo().username;
  const timestamp = Date.now();

  fs.unlinkSync(path);

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

export const establishNetworkConnection = (dest: string, port: number): NetworkActivity => {
  const protocol = 'tcp';
  const sourceAddress = getLocalIPAddress() || '127.0.0.1';
  const username = os.userInfo().username;
  const client = new net.Socket();
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
